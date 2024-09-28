import AuditEntity from '../../config/persistence/audit.entity';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	name: 'track',
	comment: '트랙 정보',
})
export default class Track extends AuditEntity {
	@PrimaryGeneratedColumn({
		comment: '아이디',
		name: 'id',
		type: 'bigint',
		unsigned: true,
	})
	id: number;

	@Column({
		comment: '제목',
		name: 'title',
		type: 'varchar',
		nullable: false,
	})
	title: string;

	@Column({
		comment: '앨범 아이디',
		name: 'album_id',
		type: 'bigint',
		unsigned: true,
		nullable: false,
	})
	@Index()
	albumId: number;

	@Column({
		comment: '아티스트 아이디',
		name: 'artist_id',
		type: 'bigint',
		unsigned: true,
		nullable: false,
	})
	@Index()
	artistId: number;

	@Column({
		comment: '아티스트 아이디',
		name: 'play_time',
		type: 'integer',
		unsigned: true,
		nullable: false,
	})
	playTime: number;

	@Column({
		comment: '재생수',
		name: 'hits',
		type: 'integer',
		unsigned: true,
		nullable: false,
		default: 0,
	})
	hits: number;

	@Column({
		comment: '가사',
		name: 'lyrics',
		type: 'text',
		nullable: true,
	})
	lyrics: string;
}
