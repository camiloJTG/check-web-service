import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index()
  @Column({ unique: true })
  mail!: string;

  @Index()
  @Column()
  password!: string;

  @Index()
  @Column({ default: new Date() })
  createdAt!: Date;

  @Index()
  @Column()
  updatedAt!: Date;
}
