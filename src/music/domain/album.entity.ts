import AuditEntity from '../../config/persistence/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
	})
	title: string;

	@Column({
		comment: '발매일',
		name: 'release_date',
		type: 'timestamp',
	})
	releaseDate: Date;

	@Column({
		comment: '총 재생 시간',
		name: 'total_play_time',
		type: 'integer',
		unsigned: true,
	})
	totalPlayTime: number;

	@Column({
		comment: '총 트랙 수',
		name: 'number_of_tracks',
		type: 'integer',
		unsigned: true,
	})
	numberOfTracks: number;

	protected constructor() {
		super();
	}


	static from(param: {
		title: string;
		releaseDate: Date;
		totalPlayTime: number;
		numberOfTracks: number;
	}) {
		const album = new Album();
		album.title = param.title;
		album.releaseDate = param.releaseDate;
		album.totalPlayTime = param.totalPlayTime;
		album.numberOfTracks = param.numberOfTracks;
		return album;
	}
}