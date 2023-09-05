import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class ActivityDto {
    @ApiProperty({
        type: String
    })
    songName: string;

    @ApiProperty({
        type: Number
    })
    scoreAvg: number;

    @ApiProperty({
        type: String
    })
    @Transform(({ value }) => new Date(Date.parse(value)))
    performance_at: Date;

    
}