import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Groups } from './groups';

@Entity({ name: 'tasks' })
export class Tasks {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  name!: string;

  @Index()
  @Column()
  isCompleted!: boolean;

  @Column()
  description!: string;

  @Index()
  @ManyToOne(() => Groups, (group) => group.id)
  groupId!: number;

  @Index()
  @Column({ default: new Date() })
  createdAt!: Date;

  @Index()
  @Column()
  updatedAt!: Date;
}
