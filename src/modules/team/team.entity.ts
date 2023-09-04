import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { TeamCandidates } from '../team-candidates/team-candidates.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.teams, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  mentor: User;

  @OneToMany(() => TeamCandidates, (TeamCandidates) => TeamCandidates.team, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  candidates: TeamCandidates[];
}