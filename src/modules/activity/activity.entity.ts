import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Score } from '../scores/score.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  songName: string;

  @Column({ type: 'int', default: 0 })
  scoreAvg: number;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  performance_at: Date;

  @ManyToOne(() => User, (user) => user.activites, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  candidate: User;

  @OneToMany(() => Score, (score) => score.activity, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  scores: Score[];
}
