import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../user/decorator/role.decorator';
import { ROLE } from '../user/enum/role.enum';
import { ScoreService } from './score.service';
import { Response } from 'express';
import { ScoreDto } from './dto/score.dto';
import { USER } from '../user/decorator/user.decorator';
import { User } from '../user/user.entity';

@ApiTags('Score')
@Controller('score')
export class ScoreController {
    constructor(
        private readonly scoreService: ScoreService
    ) {

    }

    @ApiOperation({ summary: 'Scoring by mentors for performance.' })
    @ApiConsumes('application/json')
    @Roles(ROLE.Mentor)
    @Post('/add')
    async addScore(@Body() info: ScoreDto[], @USER() user: User, @Res() res: Response) {
        await this.scoreService.addScore(user, info);
        res
    }

    @ApiOperation({ summary: 'Get all scores of all the candidates based on role.' })
    @ApiConsumes('application/json')
    @Roles(ROLE.Mentor, ROLE.Admin)
    @Get('/getAll')
    async getAllScores(@USER() user: User, @Res() res: Response) {
        let result = await this.scoreService.getAllScores(user);
        res.status(200).json(result);
    }
}
