import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';
import { getValidationPipeOptions } from './config/validation-pipe.options';

async function bootstrap() {
  const port = configService.getPort();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(getValidationPipeOptions()));
  await app.listen(port, () => console.log(`App started on port ${port}`));
}
bootstrap();
