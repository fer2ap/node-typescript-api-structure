import { mongo } from '../database/index';
import { createSchema, Type } from 'ts-mongoose';

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true, unique: true, index: true, lowercase: true }),
  password: Type.string({ required: true, select: false }),
  createdAt: Type.date({ default: Date.now })
});

export const User = mongo;
