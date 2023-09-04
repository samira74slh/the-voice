import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const SwaggerConfig = (app: INestApplication): void => {
  const config = app.get(ConfigService);
  const option = new DocumentBuilder()
    .setTitle('The Voice')
    .setDescription('Api Tool for')
    .setVersion('v0.0.1')
    .addServer(config.get('origin'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT',
    )
    .build();
  const document = SwaggerModule.createDocument(app, option, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api-docs', app, document);
};
