import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8000;
  app.enableCors({
    origin: '*',
    methods: '*',
  });
  await app.listen(PORT);
}

bootstrap();
