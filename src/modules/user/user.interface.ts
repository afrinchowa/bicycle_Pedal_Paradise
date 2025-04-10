export type TUser = {
  id: string; // <-- Add this
  name: string;
  email: string;
  photo?: string | null;
  password: string;
  role: 'admin' | 'user';
  userStatus?: 'in-progress' | 'blocked';
  createdAt?: Date;
  updatedAt?: Date;
};
