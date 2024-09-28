import AuditEntity from '../config/persistence/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import FileType from './file-type';

@Entity({
	comment: '파일',
	name: 'file',
})
export default class File extends AuditEntity {
	@PrimaryGeneratedColumn({
		comment: '아이디',
		name: 'id',
		type: 'bigint',
		unsigned: true,
	})
	id: number;

	@Column({
		comment: '파일 타입',
		name: 'type',
		enum: FileType,
		default: FileType.MUSIC,
		nullable: false,
	})
	type: FileType;

	@Column({
		comment: '파일 위치',
		name: 'path',
		type: 'varchar',
		nullable: false,
	})
	path: string;

	@Column({
		comment: '파일 크기',
		name: 'size',
		type: 'integer',
		nullable: false,
	})
	size: number;
}