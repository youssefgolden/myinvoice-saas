import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AccessJwtStrategy extends PassportStrategy(Strategy, 'jwt-access') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET!,
      ignoreExpiration: false,
    });
  }

  validate(payload: { sub: string; email: string; role: 'ADMIN'|'USER'; tenantId: string }) {
    // payload devient req.user
    return { id: payload.sub, email: payload.email, role: payload.role, tenantId: payload.tenantId };
  }
}
