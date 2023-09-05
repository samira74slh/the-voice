import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './team.entity';
import { FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { team } from '../user/dto/create-user.dto';
import { TeamCandidateervice } from '../team-candidates/team-candidate.service';

@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team) private readonly teamReporitory: Repository<Team>,
        private readonly tCandidateService: TeamCandidateervice

    ) { }

    async findOneByOptions(options: FindOneOptions<Team>): Promise<Team | null> {
        try {
            return await this.teamReporitory.findOne(options);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findByOptions(options: FindManyOptions<Team>): Promise<Team[]> {
        try {
            return await this.teamReporitory.find(options);
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

    async scoreAvgTeam(teameId: number): Promise<number> {
        try {
            const { candidates } = await this.teamReporitory.findOne({
                where: { candidates: { team: { id: teameId } } },
                select: {
                    candidates: { candidate: { activites: { scoreAvg: true } } }
                },
                relations: {
                    candidates: { candidate: { activites: true } }
                }
            });
            let totalScore = 0;
            let count = 0;
            candidates?.map(el => {
                el.candidate.activites.map(act => {
                    totalScore += act.scoreAvg;
                    count++;
                });
            });
            return Math.ceil(totalScore / count);
        } catch (error) {
            throw new Error(error);
        }
    }
}
