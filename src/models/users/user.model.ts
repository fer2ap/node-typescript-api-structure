import { model } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import { IUser, IUserModel } from '@models/users/users.types';
import UserSchema from '@models/users/users.schema';

export const UserModel: IUserModel = model<IUser, IUserModel>('user', UserSchema);

export default UserModel;
