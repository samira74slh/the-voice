import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerConfig } from './config/swagger.config';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const port = config.get('port');
  const origin = config.get('origin');
  app.enableCors({
    allowedHeaders: ['content-type', '*'],
    origin: origin,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
        enableCircularCheck: true,
      },
    }),
  );
  app.setGlobalPrefix('api');
  SwaggerConfig(app);
  const server = await app.listen(+port, async () => {
    Logger.log(`Application is running on: ${await app.getUrl()}`);
  });
  server.setTimeout(1800000); // 30 minutes(n/60000)
}
bootstrap();
