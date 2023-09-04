import { UserDto } from 'src/modules/user/dto/user.dto';

export type IJwtPayload = Pick<UserDto, 'id' & 'name' & 'role'>;
