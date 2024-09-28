import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default abstract class AuditEntity {
	@CreateDateColumn({
		comment: '생성일',
		name: 'created_at',
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		comment: '생성일',
		name: 'updated_at',
		type: 'timestamp',
		nullable: false,
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;

	@DeleteDateColumn({ comment: '생성일', name: 'deleted_at', type: 'timestamp', nullable: true, default: null })
	deletedAt: Date | null;
}
