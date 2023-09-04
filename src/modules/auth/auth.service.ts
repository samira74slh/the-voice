import { Injectable } from '@nestjs/common';
import { IJwtPayload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async getAccessToken(payload: IJwtPayload): Promise<string> {
    try {
      return await this.jwtService.signAsync(payload);
    } catch (error) {
      throw new Error(error);
    }
  }
}
