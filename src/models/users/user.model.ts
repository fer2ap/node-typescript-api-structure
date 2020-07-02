import { model } from 'mongoose';
import { IUserDocument } from '@models/users/users.types';
import UserSchema from '@models/users/users.schema';

export const UserModel = model<IUserDocument>('user', UserSchema);
