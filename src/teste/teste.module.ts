import { AuthModule } from './../auth/auth.module';
import { TesteUsuario } from './teste-usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TesteResolver } from './teste.resolver';
import { TesteService } from './teste.service';

@Module({
  imports: [TypeOrmModule.forFeature([TesteUsuario]), AuthModule],
  providers: [TesteResolver, TesteService],
})
export class TesteModule {}
