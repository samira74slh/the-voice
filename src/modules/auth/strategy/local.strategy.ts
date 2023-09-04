import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserValidationDto } from 'src/modules/user/dto/user-validation';
import { User } from 'src/modules/user/user.entity';
import { UserService } from 'src/modules/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  async validate({ name, password }: UserValidationDto): Promise<User> {
    const user = await this.userService.findOnByOptions({
      where: { name: name },
    });
    if (user) {
      const isPassMatching = await bcrypt.compare(password, user.password);
      if (isPassMatching) {
        delete user.password;
        return user;
      } else throw new UnauthorizedException();
    } else throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
  }
}
