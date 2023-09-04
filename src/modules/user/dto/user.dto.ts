import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enum/gender.enum';
import { ROLE } from '../enum/role.enum';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: Gender;

  @ApiProperty()
  role: ROLE;
}
