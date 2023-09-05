import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import localConfig from 'src/config/local.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConfigService } from 'src/config/mysql.config.service';
import { AuthModule } from '../auth/auth.module';
import { TeamModule } from '../team/team.module';
import { TeamCandidateModule } from '../team-candidates/team-candidate.module';
import { ScoreModule } from '../scores/score.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      expandVariables: true,
      load: [localConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MysqlConfigService,
    }),
    UserModule,
    AuthModule,
    TeamModule,
    TeamCandidateModule,
    ScoreModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
