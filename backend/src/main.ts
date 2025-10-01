import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

console.log('[BOOT] DATABASE_URL =', process.env.DATABASE_URL);
console.log('[BOOT] DB_SSL =', process.env.DB_SSL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // si tu appelles depuis un front externe
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
