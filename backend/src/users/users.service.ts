import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './users.types';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  // DEMO: base en mémoire — remplace par ta BDD plus tard
  private users: User[] = [];

  constructor() {
    // seed d’un user démo (mdp: "password123")
    const seed = async () => {
      const hash = await bcrypt.hash('password123', 10);
      this.users.push({
        id: randomUUID(),
        email: 'admin@acme.io',
        passwordHash: hash,
        role: 'ADMIN',
        tenantId: 'tenant-acme',
        refreshTokenHash: null,
      });
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    seed();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(u => u.id === id);
  }

  async validatePassword(user: User, password: string) {
    return bcrypt.compare(password, user.passwordHash);
  }

  async setRefreshToken(userId: string, rawToken: string) {
    const u = await this.findById(userId);
    if (!u) return;
    u.refreshTokenHash = await bcrypt.hash(rawToken, 10);
  }

  async clearRefreshToken(userId: string) {
    const u = await this.findById(userId);
    if (!u) return;
    u.refreshTokenHash = null;
  }

  async verifyRefreshToken(userId: string, rawToken: string) {
    const u = await this.findById(userId);
    if (!u || !u.refreshTokenHash) return false;
    return bcrypt.compare(rawToken, u.refreshTokenHash);
  }
}
