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
    return {
      access_token: this.gerarAccessToken(user),
      refresh_token: this.gerarRefreshToken(user),
    };
  }

  async loginSpringBoot(user: any): Promise<any> {
    return {
      access_token: this.gerarAccessToken(user),
      refresh_token: this.gerarRefreshToken(user),
    };
  }

  private gerarAccessToken(user: any) {
    const payload = { username: user.email, sub: user.id, roles: ['ROLE_ADMIN'] };
    return this.jwtService.sign(payload, {
      expiresIn: '6000s',
      header: {
        type: 'access',
      },
    });
  }

  private gerarRefreshToken(user: any) {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      expiresIn: `${3600 * 10}s`,
      header: {
        type: 'auth',
      },
    });
  }
}
