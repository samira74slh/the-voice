import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Score } from './score.entity';
import { ScoreDto } from './dto/score.dto';
import { User } from '../user/user.entity';
import { ActivityService } from '../activity/activity.service';
import { ROLE } from '../user/enum/role.enum';
import { UserService } from '../user/user.service';

@Injectable()
export class ScoreService {
    constructor(
        @InjectRepository(Score) private readonly scoreRepository: Repository<Score>,
        private readonly activityService: ActivityService,
        private readonly userService: UserService,
    ) { }

    async addScore(mentor: User, info: ScoreDto[]): Promise<Score[]> {
        try {
            let scores: Score[] = [];
            let actIds = new Set<number>();
            info.map(el => {
                actIds.add(el.activityId)
                scores.push(this.scoreRepository.create(
                    {
                        mentor: { id: mentor.id },
                        activity: { id: el.activityId },
                        score: el.score
                    }))
            });
            scores = await this.scoreRepository.save(scores);
            await this.activityService.updateScoreAvgIds([...actIds]);
            return scores;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllScores(user: User): Promise<any> {
        try {
            let where: FindOptionsWhere<User> = { role: ROLE.Candidate, activites: { scores: true } }
            if (user.role === ROLE.Mentor)
                Object.assign(where, { teams: { mentor: { id: user.id } } });
            return await this.userService.findByOptions({
                where: where,
                select: {
                    id: true,
                    name: true,
                    role: true,
                    activites: {
                        id: true,
                        songName: true,
                        scoreAvg: true,
                        performance_at: true,
                        scores: {
                            id: true,
                            score: true,
                            mentor: {
                                id: true,
                                name: true,
                                role: true,
                            },
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
