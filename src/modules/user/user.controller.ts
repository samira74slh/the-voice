import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({ summary: 'Create fake users of all types with all the needed relations, and activities' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @UseGuards()
    @Post('/add')
    async addUser(@Body() info: CreateUserDto, @Res() res: Response) {
        const user = await this.userService.addUser(info);
        res.json(user).status(200);
    }
}
