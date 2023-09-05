import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { TeamCandidate } from '../team-candidates/team-candidate.entity';

@Entity()
export class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  name: string;

  @ManyToOne(() => User, (user) => user.teams, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  mentor: User;

  @OneToMany(() => TeamCandidate, (TeamCandidate) => TeamCandidate.team, {
    onDelete: 'NO ACTION',
    onUpdate: 'CASCADE',
  })
  candidates: TeamCandidate[];

  scoreAvg: number;
}
