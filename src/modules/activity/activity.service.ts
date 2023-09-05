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
}