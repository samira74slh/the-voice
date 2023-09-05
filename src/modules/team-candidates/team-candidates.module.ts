import { Module } from '@nestjs/common';
import { TeamCandidatesService } from './team-candidates.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamCandidates } from './team-candidates.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TeamCandidates])],
    providers: [TeamCandidatesService],
    exports: [TeamCandidatesService]
})
export class TeamCandidatesModule { }
