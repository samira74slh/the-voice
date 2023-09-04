import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOnByOptions(options: FindOneOptions<User>): Promise<User | null> {
    try {
      return await this.userRepository.findOne(options);
    } catch (error) {
      throw new Error(error);
    }
  }
}
