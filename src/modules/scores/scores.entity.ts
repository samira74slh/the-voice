import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { Max } from 'class-validator';

@Entity()
export class Scores {
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
}
