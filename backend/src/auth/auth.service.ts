import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.users.findByEmail(email);
    if (!user || !(await this.users.validatePassword(user, password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
      { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: process.env.JWT_ACCESS_TTL || '900s' },
    );

    // refresh minimal + rotation
    const refreshToken = await this.jwt.signAsync(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: process.env.JWT_REFRESH_TTL || '7d' },
    );
    await this.users.setRefreshToken(user.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
    };
    // NOTE prod: inclure un "session id" dans le payload refresh pour gérer multi-sessions
  }

  async refresh(userId: string) {
    const user = await this.users.findById(userId);
    if (!user) throw new UnauthorizedException();

    const accessToken = await this.jwt.signAsync(
      { sub: user.id, email: user.email, role: user.role, tenantId: user.tenantId },
      { secret: process.env.JWT_ACCESS_SECRET!, expiresIn: process.env.JWT_ACCESS_TTL || '900s' },
    );

    const newRefresh = await this.jwt.signAsync(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_SECRET!, expiresIn: process.env.JWT_REFRESH_TTL || '7d' },
    );
    await this.users.setRefreshToken(user.id, newRefresh);

    return { accessToken, refreshToken: newRefresh };
  }

  async logout(userId: string) {
    await this.users.clearRefreshToken(userId);
    return { success: true };
  }
}
