import { ITask, ITaskModel } from '@models/tasks/tasks.types';
import { model } from 'mongoose';
import TaskSchema from '@models/tasks/tasks.schema';

export const TaskModel: ITaskModel = model<ITask, ITaskModel>('task', TaskSchema);

export default TaskModel;
