import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserValidationDto extends PickType(UserDto, ['name']) {
  password: string;
}
