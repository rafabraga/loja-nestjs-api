import { Usuario } from './usuario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuarioService],
  exports: [UsuarioService],
})
export class UsuarioModule {}
