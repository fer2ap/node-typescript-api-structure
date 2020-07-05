import { Schema, Types } from 'mongoose';

const TasksSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: [{ type: Types.ObjectId, ref: 'UserModel', required: true }],
  project: { type: Types.ObjectId, ref: 'ProjectModel', required: true },
  completed: { type: Boolean, required: true, default: false },
  createdAt: { type: String, default: new Date() },
  lastUpdate: { type: String, default: new Date() }
});

export default TasksSchema;
