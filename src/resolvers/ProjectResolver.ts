import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import ProjectModel from '../models/Project';
import { Project, NewProjectInput } from '../entities/Project';

@Resolver()
class ProjectResolver {
  @Query(() => [Project])
  async getAllProjects() {
    const result = await ProjectModel.find();
    return result;
  }

  @Mutation(() => Project)
  async createProject(
    @Arg('newProjectInput') args: NewProjectInput
  ): Promise<Project> {
    const project = new ProjectModel({
      name: args.name,
      creationDate: Date.now(),
      limitDate: args.limitDate,
      status: args.status,
      manager: args.manager,
    });
    const result = await project.save();
    return result;
  }
}

export default ProjectResolver;
