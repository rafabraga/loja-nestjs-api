import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {

  constructor(@InjectRepository(Usuario) private readonly usuarioRepository: Repository<Usuario>) {}

  async findOne(username: string): Promise<Usuario> {
    return this.usuarioRepository.findOne({
      email: username,
    });
  }

}
