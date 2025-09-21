import { model } from 'mongoose';
import { userSchema } from '../schemas/user.schema';

export type UserDoc = {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export const UserModel = model<UserDoc>('User', userSchema);
