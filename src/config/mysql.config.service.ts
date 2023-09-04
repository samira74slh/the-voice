import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import localConfig from './local.config';

@Injectable()
export class MysqlConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(localConfig.KEY)
    private readonly configService: ConfigType<typeof localConfig>,
  ) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return this.configService.mysql;
  }
}
