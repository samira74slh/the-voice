import { ApiProperty, ApiPropertyOptional, IntersectionType, OmitType } from "@nestjs/swagger";
import { UserDto } from "./user.dto";
import { ActivityDto } from "src/modules/activity/dto/activity.dto";

export class activity extends OmitType(ActivityDto, ['scoreAvg']) { }

export class team {

    @ApiProperty()
    name:string;

    @ApiProperty()
    candidateIds: number[];
}


export class CreateUserDto extends IntersectionType(
    UserDto
) {
    @ApiProperty({
        type: String
    })
    password: string;

    @ApiPropertyOptional({
        type: [activity]
    })
    activities?: activity[];

    @ApiPropertyOptional({
        type: [team]
    })
    teams?: team[];
}

