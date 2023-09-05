import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamCandidateModule } from '../team-candidates/team-candidate.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]),
TeamCandidateModule],
  providers: [TeamService],
  exports: [TeamService]
})
export class TeamModule { }
