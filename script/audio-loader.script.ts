import * as fs from 'fs';
import * as path from 'path';
import { IPicture, loadMusicMetadata } from 'music-metadata';
import MusicMetadata from './music-metadata';
import Track from '../src/music/domain/track.entity';
import Album from '../src/music/domain/album.entity';
import Artist from '../src/music/domain/artist.entity';
import Genre from '../src/music/domain/genre.entity';
import { DataSource } from 'typeorm';
import { typeormConfig } from '../src/config/persistence/ormconfig';

class MusicMetadataLoader {
	private albums: Album[] = [];
	private artists: Artist[] = [];
	private tracks: Track[] = [];
	private genres: Genre[] = [];
	private dataSource: DataSource;

	constructor() {
		this.dataSource = new DataSource({
			...typeormConfig,
			entities: [Album, Artist, Track, Genre],
		});
	}

	async initData() {
		await this.dataSource.initialize();
		const genreRepository = this.dataSource.getRepository(Genre);
		const artistRepository = this.dataSource.getRepository(Artist);
		const trackRepository = this.dataSource.getRepository(Track);
		const albumRepository = this.dataSource.getRepository(Album);

		this.genres = await genreRepository.find();
		this.artists = await artistRepository.find();
		this.tracks = await trackRepository.find();
		this.albums = await albumRepository.find();
	}

	async readFiles(rootPath: string) {
		const dir = fs.readdirSync(rootPath);
		for (const filePath of dir) {
			const fullFilePath = path.join(rootPath, filePath);
			const stats = fs.statSync(fullFilePath);

			if (stats.isDirectory()) {
				await this.readFiles(fullFilePath);
			} else {
				const metadata = await this.parseAudioFile(fullFilePath);
				const audioSize = stats.size;
				this.artists.push(Artist.from({
					name: metadata.artists[0],
				}));
				console.log(metadata);
			}
		}
	}

	async parseAudioFile(filePath: string) {
		const { parseFile } = await loadMusicMetadata();
		const metadata = await parseFile(filePath);
		console.log(metadata);
		await this.saveImage(metadata.common.picture[0], filePath, metadata.common.album);
		return {
			diskNo: metadata.common.disk.no,
			trackNo: metadata.common.track.no,
			title: metadata.common.title,
			albumName: metadata.common.album,
			artists: metadata.common.artists.length ? metadata.common.artists : [metadata.common.artist],
			genres: metadata.common.genre,
			albumArtist: metadata.common.albumartist,
			extension: metadata.format.container,
			duration: metadata.format.duration,
			releaseDate: metadata.common.releasedate,
		} as MusicMetadata;
	}

	async saveImage(picture: IPicture, filePath: string, albumName: string) {
		const imageUintArray = picture.data;
		const imageFormat = picture.format;
		const pathArr = filePath.split('\\');
		const folderPath = pathArr.slice(0, -1).join('\\');

		const imagePath = folderPath + '\\' + albumName + '.' + imageFormat.split('/')[1];

		try {
			fs.accessSync(imagePath);
		} catch (e) {
			fs.writeFileSync(imagePath, imageUintArray);
		}

		return { imagePath, byte: imageUintArray.length };
	}

	addGenre(genre: Genre) {
		const existsGenre = this.genres.some((g) => g.name === genre.name);
		if (!existsGenre) {
			this.genres.push(genre);
		}
	}

	addArtist(artist: Artist) {
		const existsArtist = this.artists.some((a) => a.name === artist.name);
		if (!existsArtist) {
			this.artists.push(artist);
		}
	}

	addAlbum(album: Album) {
		const existsAlbum = this.albums.some((a) => a.title === album.title);
		if (!existsAlbum) {
			this.albums.push(album);
		}
	}

	addTrack(track: Track) {
		const existsTrack = this.tracks.some((t) => t.title === track.title && t.playTime === track.playTime);
		if (!existsTrack) {
			this.tracks.push(track);
		}
	}
}

// 사용 예제
(async () => {
	try {
		const loader = new MusicMetadataLoader();
		await loader.initData();
		await loader.parseAudioFile('E:Music\\metal\\Paradox\\Massacre Of The Cathars_17607.MP3');
		// await loader.readFiles('E:Music');
	} finally {
		process.exit(0);
	}

})();