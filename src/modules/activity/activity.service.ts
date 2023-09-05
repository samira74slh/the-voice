import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { activity } from '../user/dto/create-user.dto';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>,
    ) { }

    async bulkCreate(candidateId: number, activites: activity[]): Promise<Activity[]> {
        try {
            let newActivites: Activity[] = []
            activites.map(act => {
                newActivites.push(this.activityRepository.create({
                    candidate: { id: candidateId },
                    ...act
                }));
            })
            return await this.activityRepository.save(newActivites);

        } catch (error) {
            throw new Error(error);
        }

    }

    async updateScoreAvgIds(ids: number[]): Promise<void> {
        try {
            ids.map(async id => {
                let act = await this.activityRepository.findOne({
                    where: { id: id },
                    relations: { scores: true }
                });
                if (act?.scores.length > 0) {
                    let totalScore = 0;
                    act?.scores.map(score => totalScore += score.score);
                    await this.activityRepository.update(act.id,
                        { scoreAvg: Math.ceil(totalScore / act?.scores.length) })
                }
            })
        } catch (error) {
            throw new Error(error);
         }
    }
}