// roles.guard.ts
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorRoleGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('No JWT token found');
    }

   
    const payload = this.jwtService.decode(token) as { role: string };


if (!payload || !'doctor'.includes(payload.role)) {
  throw new ForbiddenException('Access denied: invalid role');
}

    return true;
  }
}