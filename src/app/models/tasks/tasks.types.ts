import { Document, Model, Types } from 'mongoose';

export interface ITaskDocument extends Document {
	title: string,
	description: string,
	assignedTo: Types.ObjectId,
	project: Types.ObjectId,
	completed: boolean,
	createdAt: Date,
	lastUpdate: Date,
}

export interface ITask extends ITaskDocument {
}

export interface ITaskModel extends Model<ITask> {
}
