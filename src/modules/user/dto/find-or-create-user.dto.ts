import { ApiProperty } from "@nestjs/swagger";
import { UserDto } from "./user.dto";

export class FindOrCreateUserDto extends UserDto {
    @ApiProperty({
        type: String
    })
    password: string;
}