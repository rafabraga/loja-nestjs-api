import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigService } from './../config/config.service';
import { ConfigModule } from './../config/config.module';
import { JwtModule } from '@nestjs/jwt';
import { LoginStrategy } from './strategy/login.strategy';
import { UsuarioModule } from './../usuario/usuario.module';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsuarioModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.secret,
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LoginStrategy, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
