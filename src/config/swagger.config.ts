import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const SwaggerConfig = (app: INestApplication): void => {
  const config = app.get(ConfigService);
  const option = new DocumentBuilder()
    .setTitle('The Voice')
    .setDescription('Api Tools')
    .setVersion('v0.0.1')
    .addServer(config.get('origin'))
    .addApiKey({ type: 'apiKey', name: 'cookie', in: 'header' }, 'cookie')
    .build();
  const document = SwaggerModule.createDocument(app, option, {
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api-docs', app, document);
};
