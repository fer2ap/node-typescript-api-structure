import { Document, Model } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  lastUpdate?: Date;
}

export interface IUserDocument extends IUser, Document{
  setLastUpdated: (this: IUserDocument) => Promise<void>;
  sameName: (this: IUserDocument) => Promise<Document[]>;
}

export interface IUserModel extends Model<IUserDocument>{
  findOneOrCreate: (
    this: IUserModel,
    {
      name,
      email
    }: {
      name: string,
      email: string
    }
  ) => Promise<IUserDocument>;
  findByName: (
    this: IUserModel,
    name: string
  ) => Promise<IUserDocument[]>;
}
