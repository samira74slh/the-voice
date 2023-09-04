import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from '../team/team.entity';

@Entity()
export class TeamCandidates {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Team, (team) => team.candidates, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  team: Team;
}
