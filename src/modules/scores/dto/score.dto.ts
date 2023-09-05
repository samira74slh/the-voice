import { ApiProperty } from "@nestjs/swagger";
import { Max, Min } from "class-validator";

export class ScoreDto {
    @ApiProperty({
        type: Number
    })
    @Min(0)
    @Max(100)
    score: number;

    @ApiProperty({
        type: Number
    })
    activityId: number;
}
