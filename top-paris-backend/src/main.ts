import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(helmet());
  app.use(compression());
  const documentConfiguration = new DocumentBuilder()
    .setTitle('Top bet Api')
    .setDescription('Top bet API Documentation')
    .setVersion('1.0.0')
    .build();

  const all = SwaggerModule.createDocument(app, documentConfiguration);
  SwaggerModule.setup('openapi', app, all);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
