import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    @Inject(Reflector) private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const loginEntryPoint = this.reflector.get<boolean>('loginEntryPoint', context.getHandler());
    const permitAll = this.reflector.get<boolean>('permitAll', context.getHandler());

    if (loginEntryPoint || permitAll) {
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
