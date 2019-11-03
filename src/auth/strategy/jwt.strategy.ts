import { ConfigService } from './../../config/config.service';
import { ExtractJwt, Strategy, JwtFromRequestFunction } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: (req: any) => {
        if (req.headers.authorization) {
          return (req.headers.authorization as string).replace('Bearer ', '');
        } else {
          return req.body.refresh_token;
        }
      },
      ignoreExpiration: false,
      secretOrKey: configService.secret,
      passReqToCallback: true,
    });
  }

  async validate(request: any, payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }

}
