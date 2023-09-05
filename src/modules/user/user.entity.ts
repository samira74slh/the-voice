import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ROLE } from './enum/role.enum';
import { Team } from '../team/team.entity';
import { Gender } from './enum/gender.enum';
import { Activity } from '../activity/activity.entity';
import { TeamCandidates } from '../team-candidates/team-candidates.entity';

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

  @OneToMany(() => TeamCandidates, (teamCandidates) => teamCandidates.candidate, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  teamCandidates: TeamCandidates[];
}
