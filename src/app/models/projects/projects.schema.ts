import { Schema, Types } from 'mongoose';

const ProjectSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	user: { type: Types.ObjectId, ref: 'UserModel', required: true },
	tasks: [ { type: Types.ObjectId, ref: 'TasksModel', required: true } ],
	createdAt: { type: String, default: new Date() },
	lastUpdate: { type: String, default: new Date() }
});

export default ProjectSchema;
