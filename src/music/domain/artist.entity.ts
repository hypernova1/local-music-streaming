import AuditEntity from '../../config/persistence/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	comment: '아티스트',
	name: 'artist',
})
export default class Artist extends AuditEntity {
	@PrimaryGeneratedColumn({
		comment: '아이디',
		type: 'bigint',
		name: 'id',
		unsigned: true,
	})
	id: number;

	@Column({
		comment: '이름',
		name: 'name',
		type: 'varchar',
		nullable: false,
	})
	name: string;

	@Column({
		comment: '장르 아이디',
		name: 'genre_id',
		type: 'bigint',
		unsigned: true,
		nullable: false,
	})
	genreId: number;

	protected constructor() {
		super();
	}

	static from(param: { name: string, genreId: number }) {
		const artist = new Artist();
		artist.name = param.name;
		artist.genreId = param.genreId;
		return artist;
	}
}