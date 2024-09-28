import * as fs from 'fs';
import * as path from 'path';
import Track from '../src/music/domain/track/track.entity';
import Album from '../src/music/domain/album/album.entity';
import Artist from '../src/music/domain/artist/artist.entity';
import Genre from '../src/music/domain/genre/genre.entity';
import { DataSource, Repository } from 'typeorm';
import { typeormConfig } from '../src/config/persistence/ormconfig';
import File from '../src/file/file.entity';
import FileType from '../src/file/file-type';
import AudioFile from '../src/music/domain/track/audio-file.entity';
import AlbumImageFile from '../src/music/domain/album/album-image-file.entity';
import AlbumArtist from '../src/music/domain/album/album-artist.entity';
import AudioMetadataParser from './audio-metadata-parser';
import FileValidator from './file-validator';
import ImageWriter from './image-writer';

class MusicMetadataLoader {

	private albums: Album[] = [];
	private artists: Artist[] = [];
	private tracks: Track[] = [];
	private genres: Genre[] = [];
	private files: File[] = [];

	private artistRepository: Repository<Artist>;
	private albumRepository: Repository<Album>;
	private genreRepository: Repository<Genre>;
	private trackRepository: Repository<Track>;
	private fileRepository: Repository<File>;

	constructor(private readonly audioMetadataParser: AudioMetadataParser) {}

	/**
	 * 데이터베이스를 초기화하고 데이터를 준비한다.
	 * */
	async loadData() {
		const dataSource = new DataSource({
			...typeormConfig,
			entities: [Album, Artist, Track, Genre, AudioFile, AlbumImageFile, File, AlbumArtist],
		});
		await dataSource.initialize();
		this.genreRepository = dataSource.getRepository(Genre);
		this.artistRepository = dataSource.getRepository(Artist);
		this.trackRepository = dataSource.getRepository(Track);
		this.albumRepository = dataSource.getRepository(Album);
		this.fileRepository = dataSource.getRepository(File);

		this.genres = await this.genreRepository.find();
		this.artists = await this.artistRepository.find();
		this.tracks = await this.trackRepository.find();
		this.albums = await this.albumRepository.find({
			relations: ['albumArtists'],
		});
		this.files = await this.fileRepository.find();
	}

	/**
	 * 파일을 탐색한다.
	 * */
	async traversingDirectories(directory: string) {
		const subDirectories = fs.readdirSync(directory);
		for (const subDirectory of subDirectories) {
			const fullFilePath = path.join(directory, subDirectory);
			const stats = fs.statSync(fullFilePath);
			if (stats.isDirectory()) {
				await this.traversingDirectories(fullFilePath);
			} else {
				if (!FileValidator.isAudioFile(subDirectory)) {
					continue;
				}
				await this.saveMusicInfo(stats, fullFilePath);
				console.log(fullFilePath + ' 저장 완료.');
			}
		}
	}

	/**
	 * 음원 정보를 저장한다.
	 * */
	private async saveMusicInfo(stats: fs.Stats, fullFilePath: string) {
		const audioSize = stats.size;

		const metadata = await this.audioMetadataParser.parse(fullFilePath);

		let genre = 'ETC';
		if (metadata.genres) {
			genre = metadata.genres[0];
		}

		const genreId = await this.addGenre(Genre.from({ name: genre }));

		let artistId: number | undefined;
		if (metadata.artists[0]) {
			artistId = await this.saveArtist(
				Artist.from({
					name: metadata.artists[0],
					genreId: genreId,
				})
			);
		}

		let imageFileId: number | undefined;
		if (metadata.picture) {
			const imageFile = await ImageWriter.write(metadata.picture, fullFilePath, metadata.albumName);
			if (imageFile) {
				imageFileId = await this.saveFile(imageFile);
			}
		}

		const albumId = await this.saveAlbum(
			Album.from({
				numberOfTracks: 0,
				title: metadata.albumName,
				totalPlayTime: 0,
				releaseDate: metadata.releaseDate ? new Date(metadata.releaseDate) : undefined,
				fileId: imageFileId,
			}),
			artistId
		);

		const audioFileId = await this.saveFile(
			File.from({
				type: FileType.AUDIO,
				path: fullFilePath,
				size: audioSize,
				extension: metadata.extension,
			})
		);

		await this.saveTrack(
			Track.from({
				diskNo: metadata.disk,
				trackNo: metadata.trackNo,
				title: metadata.title,
				playTime: metadata.duration || 0,
				artistId: artistId,
				albumId: albumId,
				lyrics: metadata.lyrics,
				fileId: audioFileId,
			})
		);
	}

	/**
	 * 트랙 정보를 통해 앨범의 총 플레이시간, 총 곡 수를 업데이트 한다.
	 * */
	async updateAlbumInfo() {
		const albumIds = new Set(this.tracks.map((track) => track.albumId));
		for (const albumId of albumIds) {
			const album = this.albums.find((album) => album.id === albumId);
			if (!album) {
				continue;
			}

			const tracks = this.tracks.filter((track) => track.albumId === albumId);
			const totalPlayTime = tracks.map((track) => track.playTime).reduce((a, b) => a + b, 0);
			album.update({
				numberOfTracks: tracks.length,
				totalPlayTime: totalPlayTime,
			});

			await this.albumRepository.save(album);
		}
	}

	/**
	 * 파일을 저장한다.
	 * */
	async saveFile(file: File): Promise<number> {
		const existedFile = this.files.find((f) => f.path === file.path);
		if (existedFile) {
			return existedFile.id;
		}

		await this.fileRepository.save(file);
		this.files.push(file);
		return file.id;
	}

	/**
	 * 장르를 저장한다.
	 * */
	async addGenre(genre: Genre): Promise<number> {
		const existedGenre = this.genres.find((g) => g.name === genre.name);
		if (existedGenre) {
			return existedGenre.id;
		}
		await this.genreRepository.save(genre);
		this.genres.push(genre);
		return genre.id;
	}

	/**
	 * 아티스트를 저장한다.
	 * */
	async saveArtist(artist: Artist): Promise<number> {
		const existedArtist = this.artists.find((a) => a.name === artist.name);
		if (existedArtist) {
			return existedArtist.id;
		}
		await this.artistRepository.save(artist);
		this.artists.push(artist);
		return artist.id;
	}

	/**
	 * 앨범을 저장한다.
	 * */
	async saveAlbum(album: Album, artistId: number): Promise<number> {
		const existedAlbum = this.albums.find((a) => a.title === album.title);
		if (existedAlbum) {
			existedAlbum.addAlbumArtist(artistId);
			await this.albumRepository.save(existedAlbum);
			return existedAlbum.id;
		}
		album.addAlbumArtist(artistId);
		this.albums.push(album);
		await this.albumRepository.save(album);
		return album.id;
	}

	/**
	 * 트랙을 저장한다.
	 * */
	async saveTrack(track: Track): Promise<number> {
		const existedTrack = this.tracks.find((t) => t.title === track.title && t.playTime === track.playTime);
		if (existedTrack) {
			return existedTrack.id;
		}
		this.tracks.push(track);
		await this.trackRepository.save(track);
		return track.id;
	}
}

(async () => {
	try {
		const loader = new MusicMetadataLoader(new AudioMetadataParser());
		await loader.loadData();
		await loader.traversingDirectories('E:Music');
		await loader.updateAlbumInfo();
	} catch (e) {
		console.error(e);
	} finally {
		process.exit(0);
	}
})();
