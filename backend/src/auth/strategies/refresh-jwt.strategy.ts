import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UsersService } from '../../users/users.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private users: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.refreshToken || req?.headers['x-refresh-token'] as string,
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET!,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { sub: string; session?: string }) {
    const token = (req.cookies?.refreshToken || req.headers['x-refresh-token']) as string;
    const ok = await this.users.verifyRefreshToken(payload.sub, token);
    if (!ok) throw new UnauthorizedException('Invalid refresh token');
    return { id: payload.sub }; // minimal
  }
}
