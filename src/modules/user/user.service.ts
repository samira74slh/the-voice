import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto, team } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ROLE } from './enum/role.enum';
import { TeamService } from '../team/team.service';
import { FindOrCreateUserDto } from './dto/find-or-create-user.dto';
import { ActivityService } from '../activity/activity.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly teamService: TeamService,
    private readonly activityService: ActivityService,
  ) { }

  async findOnByOptions(options: FindOneOptions<User>): Promise<User | null> {
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOrCreate(info: FindOrCreateUserDto): Promise<User> {
    try {
      let { password, ...userInfo } = info;
      password = await bcrypt.hash(password, 10);
      let user = await this.userRepository.findOne({
        where: userInfo
      });
      if (user)
        user.password = password;
      else
        user = this.userRepository.create({ ...userInfo, password: password });
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async addUser(info: CreateUserDto): Promise<User> {
    try {
      let { activities, teams, ...userInfo } = info;
      let user = await this.findOrCreate(userInfo);
      if (user.role === ROLE.Candidate && activities?.length > 0) {
        await this.activityService.bulkCreate(user.id, activities);
      }
      if (user.role === ROLE.Mentor && teams?.length > 0) {
        const candidates = await this.userRepository.find({ where: { role: ROLE.Candidate } })
        if (candidates?.length > 0) {
          await this.teamService.bulkCreate(user.id, teams);
        } else
          throw new HttpException(
            'Please add a number of candidates to register the team first.',
            HttpStatus.BAD_REQUEST)
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
