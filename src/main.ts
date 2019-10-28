import { ConfigService } from './config/config.service';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  app.useGlobalGuards(app.get<JwtAuthGuard>(JwtAuthGuard));
  await app.listen(configService.port);
}
bootstrap();
