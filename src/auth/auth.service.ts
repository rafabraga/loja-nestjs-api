import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const usuario = await this.usuarioService.findOne(username);
    if (usuario && usuario.senha === password) {
      const { senha, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '30s' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '60s' }),
    };
  }

  async refresh(token: any): Promise<any> {
    const a = this.jwtService.verify(token);
    console.log(a);
  }
}
