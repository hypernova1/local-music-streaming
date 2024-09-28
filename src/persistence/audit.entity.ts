import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export default abstract class AuditEntity {
  @CreateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date | null;
}
