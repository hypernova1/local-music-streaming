import AuditEntity from '../../../config/persistence/audit.entity';
import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import AlbumImageFile from './album-image-file.entity';
import AlbumArtist from './album-artist.entity';

@Entity({
	comment: '앨범',
	name: 'album',
})
export default class Album extends AuditEntity {
	@PrimaryGeneratedColumn({
		comment: '아이디',
		type: 'bigint',
		name: 'id',
		unsigned: true,
	})
	id: number;

	@Column({
		comment: '앨범명',
		type: 'varchar',
		name: 'title',
		nullable: true,
	})
	title: string;

	@Column({
		comment: '발매일',
		name: 'release_date',
		type: 'timestamp',
		nullable: true,
	})
	releaseDate?: Date;

	@Column({
		comment: '총 재생 시간',
		name: 'total_play_time',
		type: 'float',
		unsigned: true,
		nullable: false,
	})
	totalPlayTime: number;

	@Column({
		comment: '총 트랙 수',
		name: 'number_of_tracks',
		type: 'integer',
		unsigned: true,
		nullable: false,
	})
	numberOfTracks: number;

	@OneToMany(() => AlbumArtist, (albumArtist) => albumArtist.album, { cascade: true })
	albumArtists: AlbumArtist[]

	@OneToOne(() => AlbumImageFile, (albumImageFile) => albumImageFile.album, { cascade: true })
	albumImageFile?: AlbumImageFile;

	protected constructor() {
		super();
	}

	static from(param: {
		title: string;
		releaseDate: Date;
		totalPlayTime: number;
		numberOfTracks: number;
		fileId?: number;
	}) {
		const album = new Album();
		album.title = param.title;
		album.releaseDate = param.releaseDate;
		album.totalPlayTime = param.totalPlayTime;
		album.numberOfTracks = param.numberOfTracks;

		if (param.fileId) {
			const albumImageFile = new AlbumImageFile();
			albumImageFile.fileId = param.fileId;
			album.albumImageFile = albumImageFile;
		}
		return album;
	}

	update(param: { totalPlayTime: number; numberOfTracks: number }) {
		this.totalPlayTime = param.totalPlayTime;
		this.numberOfTracks = param.numberOfTracks;
	}

	addAlbumArtist(artistId: number) {
		if (!artistId) {
			return;
		}

		if (!this.albumArtists) {
			this.albumArtists = [];
		}

		const existsArtist = this.albumArtists.some((aa) => aa.artistId === artistId)
		if (existsArtist) {
			return;
		}
		const albumArtist = new AlbumArtist();
		albumArtist.artistId = artistId;
		this.albumArtists.push(albumArtist);
	}
}