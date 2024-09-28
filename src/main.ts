import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import TransformPipe from './config/transform-pipe';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: false }));
  await app.listen(3000);
}

bootstrap();
