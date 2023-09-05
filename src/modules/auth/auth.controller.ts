import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { ApiConsumes, ApiTags, ApiOperation } from '@nestjs/swagger';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UserValidationDto } from '../user/dto/user-validation';
import { USER } from '../user/decorator/user.decorator';
import { User } from '../user/user.entity';
import { Response } from 'express';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @ApiOperation({ summary: 'login to app' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() info: UserValidationDto,
    @USER() user: User,
    @Res() res: Response,
  ){
    const token = await this.authService.getAccessToken(user);
    res.cookie('accessToken', token);
    res.json(user).status(200);
  }
}
