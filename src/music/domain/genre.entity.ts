import AuditEntity from '../../config/persistence/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	comment: '장르',
	name: 'genre',
})
export default class Genre extends AuditEntity {
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
}