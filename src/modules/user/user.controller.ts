import { Body, Controller, Get, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { Roles } from './decorator/role.decorator';
import { ROLE } from './enum/role.enum';
import { User } from './user.entity';
import { USER } from './decorator/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create fake users of all types with all the needed relations, and activities' })
    @ApiConsumes('application/json')
    @Post('/add')
    async addUser(@Body() info: CreateUserDto, @Res() res: Response) {
        const user = await this.userService.addUser(info);
        res.json(user).status(200);
    }

    @ApiOperation({ summary: 'A list of all the candidates for a mentor s teams' })
    @ApiConsumes('application/json')
    @Roles(ROLE.Mentor)
    @Get('/candidate/getAll')
    async getAllCandidate(@USER() user: User, @Res() res: Response) {
        const result = await this.userService.getAllCandidate(user);
        res.json(result).status(200);
    }

    @ApiOperation({ summary: 'Get all candidates informations for a mentor s teams' })
    @ApiConsumes('application/json')
    @Roles(ROLE.Mentor)
    @Get('/candidate/:candidateId')
    async getCandidateInfo(@Query() candidateId: number, @USER() user: User, @Res() res: Response) {
        const result = await this.userService.getCandidateInfo(user, candidateId);
        res.json(result).status(200);
    }

    @ApiOperation({ summary: 'Get all teams' })
    @ApiConsumes('application/json')
    @Roles(ROLE.Admin)
    @Get('/team/getAll')
    async getAllTeams(@Res() res: Response, @Query() name?: string) {
        const result = await this.userService.getAllTeams();
        res.json(result).status(200);
    }

    @ApiOperation({ summary: 'Get all teams' })
    @ApiConsumes('application/json')
    @Roles(ROLE.Admin)
    @Get('/team/:teamId')
    async getTeamInfo(@Query() teamId: number, @Res() res: Response) {
        const result = await this.userService.getTeamInfo(teamId);
        res.json(result).status(200);
    }
}