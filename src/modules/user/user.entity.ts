import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './enum/role.enum';
import { Team } from '../team/team.entity';
import { Gender } from './enum/gender.enum';
import { Activity } from '../activity/activity.entity';
import { TeamCandidate } from '../team-candidates/team-candidate.entity';
import { Score } from '../scores/score.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.Male })
  gender: Gender;

  @Column({ type: 'enum', enum: ROLE, default: ROLE.Candidate })
  role: ROLE;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: Date;

  @OneToMany(() => Team, (team) => team.mentor, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  teams: Team[];

  @OneToMany(() => Activity, (activity) => activity.candidate, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  activites: Activity[];

  @OneToMany(() => TeamCandidate, (TeamCandidate) => TeamCandidate.candidate, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  TeamCandidate: TeamCandidate[];

  @OneToOne(() => Score, (score) => score.mentor, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE'
  })
  score: Score;
}
