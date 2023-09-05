import { ApiProperty } from "@nestjs/swagger";
import { Max, Min } from "class-validator";

export class ScoreDto {
    @ApiProperty()
    @Min(0)
    @Max(100)
    score: number;

    @ApiProperty()
    activityId:number;
}
