import { Module } from '@nestjs/common';
import { TeamCandidateervice } from './team-candidate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamCandidate } from './team-candidate.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TeamCandidate])],
    providers: [TeamCandidateervice],
    exports: [TeamCandidateervice]
})
export class TeamCandidateModule { }
