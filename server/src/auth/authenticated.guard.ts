import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate = async (context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated();
  };
}
