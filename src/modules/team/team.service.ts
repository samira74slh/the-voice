import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { team } from '../user/dto/create-user.dto';
import { TeamCandidatesService } from '../team-candidates/team-candidates.service';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team) private readonly teamReporitory: Repository<Team>,
        private readonly tCandidateService: TeamCandidatesService

    ) { }

    async findOnByOptions(options: FindOneOptions<Team>): Promise<Team | null> {
        try {
            return await this.teamReporitory.findOne(options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async bulkCreate(mentorId: number, teams: team[]): Promise<Team[]> {
        try {
            let newTeams: Team[] = [];
            teams.map(async team => {
                let newTeam = await this.teamReporitory.save(
                    this.teamReporitory.create({ name: team.name, mentor: { id: mentorId } }));
                newTeams.push(newTeam);
                await this.tCandidateService.bulkCreate({
                    candidateIds: team.candidateIds,
                    teamId: newTeam.id
                })
            });
            return newTeams;
        } catch (error) {
            throw new Error(error);
        }
    }

}
