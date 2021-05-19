import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  ManyToOne,
} from 'typeorm';
import { Users } from './users';

@Entity({ name: 'groups' })
export class Groups {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column()
  name!: string;

  @Index()
  @Column()
  isFeatured!: boolean;

  @Index()
  @ManyToOne(() => Users, (user) => user.id)
  userId!: number;

  @Index()
  @Column({ default: new Date() })
  createdAt!: Date;

  @Index()
  @Column()
  updatedAt!: Date;
}
