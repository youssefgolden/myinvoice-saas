export type Role = 'ADMIN' | 'USER';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  tenantId: string;
  refreshTokenHash?: string | null;
}
