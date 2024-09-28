import AuditEntity from '../config/persistence/audit.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'track',
  comment: '트랙 정보',
})
export default class Track extends AuditEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}