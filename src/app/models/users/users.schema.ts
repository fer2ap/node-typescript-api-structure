import { setLastUpdated, sameName, hashPassword } from '@models/users/users.methods';
import { findOneOrCreate, findByName } from '@models/users/users.statics';
import { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, index: { unique: true }, lowercase: true },
  password: { type: String, required: true, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetTokenExpires: { type: Date, select: false },
  createdAt: { type: String, default: new Date() },
  lastUpdate: { type: String, default: new Date() }
});

UserSchema.methods.setLastUpdated = setLastUpdated;
UserSchema.methods.sameName = sameName;

UserSchema.statics.findOneOrCreate = findOneOrCreate;
UserSchema.statics.findByName = findByName;

UserSchema.pre('save', hashPassword);

export default UserSchema;
