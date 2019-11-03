import { TesteUsuario } from './teste-usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TesteService {

  constructor(@InjectRepository(TesteUsuario) private readonly testeUsuarioRepository: Repository<TesteUsuario>) {}

  async buscarUnicoUsuario(): Promise<TesteUsuario> {
    return this.testeUsuarioRepository.findOne(1);
  }
}
