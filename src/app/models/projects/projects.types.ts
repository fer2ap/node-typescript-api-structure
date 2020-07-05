import { Document, Model, Types } from 'mongoose';

export interface IProjectDocument extends Document {
	title: string,
	description: string,
	user: Types.ObjectId,
	tasks: Types.ObjectId[],
	createdAt: Date,
	lastUpdate: Date,
}

export interface IProject extends IProjectDocument {
	// methods annotation here
}

export interface IProjectModel extends Model<IProject> {
	// statics annotation here
}
