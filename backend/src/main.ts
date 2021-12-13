import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './config/config.service';

async function bootstrap() {
  const port = configService.getPort();
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`App started on port ${port}`));
}
bootstrap();
