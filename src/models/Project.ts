         import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema({
  name: String,
  creationDate: Date,
  limitDate: Date,
  status: String,
  manager: String,
});

const ProjectModel = model('project', ProjectSchema);

export default ProjectModel;
