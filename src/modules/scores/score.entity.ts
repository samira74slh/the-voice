import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { Max } from 'class-validator';
import { User } from '../user/user.entity';

@Entity()
export class Score {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  @Max(100)
  @Max(0)
  score: number;

  @ManyToOne(() => Activity, (activity) => activity.scores, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  activity: Activity;

  @OneToOne(() => User, (user) => user.score, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  mentor: User;
}
