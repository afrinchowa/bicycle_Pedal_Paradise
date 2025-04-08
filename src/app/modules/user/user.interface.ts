export type TUser = {
<<<<<<< HEAD
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
=======
  id: string; // <-- Add this
  name: string;
  email: string;
  photo?: string | null;
  password: string;
  role: 'admin' | 'user';
  userStatus?: 'in-progress' | 'blocked';
  createdAt?: Date;
  updatedAt?: Date;
>>>>>>> main
};
