import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class LoginAuthGuard extends AuthGuard('login') {

  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const grantTypeRefreshToken = this.getRequest(context).body.grant_type === 'refresh_token';

    if (grantTypeRefreshToken) {
      return true;
    } else {
      return (await super.canActivate(context)) as boolean;
    }
  }

  getRequest(context: ExecutionContext) {
    if (!context.switchToHttp().getRequest()) {
      return GqlExecutionContext.create(context).getContext().req;
    } else {
      return context.switchToHttp().getRequest();
    }
  }
}
