// eslint-disable-next-line no-unused-vars
import { Document, HookNextFunction, Model } from 'mongoose';

export interface IUserDocument extends Document {
	name: string;
	email: string;
	password: string;
	passwordResetToken?: string;
	passwordResetTokenExpires?: Date;
	createdAt?: Date;
	lastUpdate?: Date;
}

export interface IUser extends IUserDocument {
	setLastUpdated (this: IUserDocument): Promise<void>;
	
	sameName (this: IUserDocument): Promise<Document[]>;
	
	hashPassword (this: IUserDocument, next: HookNextFunction): Promise<void>;
}

export interface IUserModel extends Model<IUser> {
	findOneOrCreate (
		this: IUserModel,
		{
			name,
			email
		}: {
			name: string,
			email: string
		}
	): Promise<IUserDocument>;
	
	findByName (
		this: IUserModel,
		name: string
	): Promise<IUserDocument[]>;
}
