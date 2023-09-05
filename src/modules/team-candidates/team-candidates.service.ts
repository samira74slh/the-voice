import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TeamCandidates } from './team-candidates.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCandidateTeamDto } from '../team/dto/create-cadidate-team.dto';

@Injectable()
export class TeamCandidatesService {
    constructor(
        @InjectRepository(TeamCandidates) private readonly tCandidatesReporitory: Repository<TeamCandidates>
    ) { }

    async findOnByOptions(options: FindOneOptions<TeamCandidates>): Promise<TeamCandidates | null> {
        try {
            return await this.tCandidatesReporitory.findOne(options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async bulkCreate({ candidateIds, teamId }: CreateCandidateTeamDto): Promise<TeamCandidates[]> {
        try {
            let newTeamCondidate: TeamCandidates[] = [];
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
