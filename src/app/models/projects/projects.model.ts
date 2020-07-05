import { IProject, IProjectModel } from '@models/projects/projects.types';
import ProjectSchema from '@models/projects/projects.schema';
import { model } from 'mongoose';

export const ProjectModel: IProjectModel = model<IProject, IProjectModel>('project', ProjectSchema);

export default ProjectModel;
