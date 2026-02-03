export interface User {
  id: string;
  email: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  imageUrl: string;
  emailVerified: string;

  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'ADMIN' | 'USER';
