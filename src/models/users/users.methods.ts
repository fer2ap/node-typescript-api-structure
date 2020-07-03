// eslint-disable-next-line no-unused-vars
import { Document } from 'mongoose';
// eslint-disable-next-line no-unused-vars
import { IUserDocument } from './users.types';

export async function setLastUpdated (
  this: IUserDocument
): Promise<void> {
  const now = new Date();
  if (!this.lastUpdate || this.lastUpdate < now) {
    this.lastUpdate = now;
    await this.save();
  }
}

export async function sameName (
  this: IUserDocument
): Promise<Document[]> {
  return this.model('user').find({ name: this.name });
}
