import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamCandidate } from './team-candidate.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCandidateTeamDto } from '../team/dto/create-cadidate-team.dto';

@Injectable()
export class TeamCandidateervice {
    constructor(
        @InjectRepository(TeamCandidate) private readonly tCandidatesReporitory: Repository<TeamCandidate>
    ) { }

    async findOneByOptions(options: FindOneOptions<TeamCandidate>): Promise<TeamCandidate | null> {
        try {
            return await this.tCandidatesReporitory.findOne(options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async bulkCreate({ candidateIds, teamId }: CreateCandidateTeamDto): Promise<TeamCandidate[]> {
        try {
            let newTeamCondidate: TeamCandidate[] = [];
            candidateIds.map(async candidateId => {
                let candidate = await this.tCandidatesReporitory.findOne({
                    where: {
                        candidate: { id: candidateId },
                        team: { id: teamId }
                    }
                })
                if (!candidate)
                    newTeamCondidate.push(this.tCandidatesReporitory.create({
                        candidate: { id: candidateId },
                        team: { id: teamId }
                    }));
            })
            return this.tCandidatesReporitory.save(newTeamCondidate);
        } catch (error) {
            throw new Error(error);
        }
    }

}
