import { createSchema, Type } from 'ts-mongoose';
import { setLastUpdated, sameName } from '@models/users/users.methods';
import { findOneOrCreate, findByName } from '@models/users/users.statics';

const UserSchema = createSchema({
  name: Type.string({ required: true }),
  email: Type.string({ required: true, unique: true, index: true, lowercase: true }),
  password: Type.string({ required: true, select: false }),
  createdAt: Type.date({ default: new Date() }),
  lastUpdate: Type.date({ default: Date.now })
});

UserSchema.statics.setLastUpdated = setLastUpdated;
UserSchema.statics.sameName = sameName;

UserSchema.methods.findOneOrCreate = findOneOrCreate;
UserSchema.methods.findByName = findByName;

export default UserSchema;
