import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindManyOptions, FindOneOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { ROLE } from './enum/role.enum';
import { TeamService } from '../team/team.service';
import { FindOrCreateUserDto } from './dto/find-or-create-user.dto';
import { ActivityService } from '../activity/activity.service';
import { Team } from '../team/team.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly teamService: TeamService,
    private readonly activityService: ActivityService,
  ) { }

  async findOneByOptions(options: FindOneOptions<User>): Promise<User | null> {
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findByOptions(options: FindManyOptions<User>): Promise<User[]> {
    try {
      return await this.userRepository.find(options);
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
      let user: User;
      if (userInfo.role === ROLE.Admin) {
        let admin = await this.userRepository.findOne({ where: { role: ROLE.Admin } });
        if (admin)
          throw new HttpException(
            'The admin is already exist.',
            HttpStatus.BAD_REQUEST);
      }
      user = await this.findOrCreate(userInfo);
      if (userInfo.role === ROLE.Candidate && activities?.length > 0) {
        await this.activityService.bulkCreate(user.id, activities);
      }
      if (userInfo.role === ROLE.Mentor && teams?.length > 0) {
        const candidates = await this.userRepository.find({ where: { role: ROLE.Candidate } })
        if (candidates?.length > 0) {
          await this.teamService.bulkCreate(user.id, teams);
        } else
          throw new HttpException(
            'Please add a number of candidates to register the team first.',
            HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllCandidate(user: User): Promise<User[]> {
    try {
      return await this.userRepository.find({
        where: { role: ROLE.Candidate, teams: { mentor: { id: user.id } } },
        select: { id: true, name: true, teams: { name: true } },
        relations: { teams: { mentor: true } }
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCandidateInfo(user: User, candidateId: number): Promise<any> {
    try {
      let users = await this.userRepository.find({
        where: { id: candidateId, teams: { mentor: { id: user.id } } },
        select: {
          id: true,
          name: true,
          activites: {
            id: true,
            songName: true,
            performance_at: true,
            scoreAvg: true
          },
          teams: {
            id: true,
            name: true,
          }
        },
        relations: { teams: { mentor: true }, activites: true }
      });
      users.map(async user => {
        user.teams.map(async team => {
          team.scoreAvg = await this.teamService.scoreAvgTeam(team.id);
        })
      });
      return users;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllTeams(name?: string): Promise<Team[]> {
    try {
      let where: FindOptionsWhere<Team>[] = name ? [{ name: Like("%" + name + "%") },
      { mentor: { name: Like("%" + name + "%") } }] : [];
      let teams = await this.teamService.findByOptions({
        where: where,
        select: { id: true, name: true },
      });
      teams.map(async team => {
        team.scoreAvg = await this.teamService.scoreAvgTeam(team.id);
      });
      return teams;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTeamInfo(teameId: number): Promise<Team[]> {
    try {
      return await this.teamService.findByOptions({
        where: { id: teameId },
        select: {
          id: true, name: true,
          candidates: {
            candidate: {
              id: true,
              name: true,
              activites: {
                id: true,
                scoreAvg: true,
                songName: true,
                performance_at: true
              }
            }
          }
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
