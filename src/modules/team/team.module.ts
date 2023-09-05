import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { TeamCandidatesModule } from '../team-candidates/team-candidates.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team]),
TeamCandidatesModule],
  providers: [TeamService],
  exports: [TeamService]
})
export class TeamModule { }
