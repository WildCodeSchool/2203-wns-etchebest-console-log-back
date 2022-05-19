import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import {
  Project,
  NewProjectInput,
  UpdateProjectInput,
  ProjectId,
  ProjectModel,
} from '../entities/Project';

@Resolver()
class ProjectResolver {
  @Query(() => [Project])
  async getAllProjects() {
    const result = await ProjectModel.find();
    return result;
  }

  @Query(() => Project)
  async getOneProject(@Arg('id') args: ProjectId): Promise<Project | null> {
    const result = await ProjectModel.findById({ _id: args._id });
    if (!result) throw new ApolloError("Ce projet n'existe pas");
    return result;
  }

  @Mutation(() => Project)
  async createProject(
    @Arg('newProjectInput') args: NewProjectInput
  ): Promise<Project> {
    if (!args.limitDate && !args.manager && !args.name && !args.status)
      throw new ApolloError('Il manque des infos');

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

  @Mutation(() => Project)
  async updateProject(
    @Arg('updateProjectInput') args: UpdateProjectInput
  ): Promise<Project | null> {
    if (!args.limitDate && !args.manager && !args.name && !args.status)
      throw new ApolloError('Il manque les infos');
    const isProjectExist = await ProjectModel.findById({ _id: args._id });
    if (!isProjectExist) throw new ApolloError("Le projet n'existe pas");

    const result = await ProjectModel.findOneAndUpdate(
      { id: args._id },
      {
        name: args.name,
        limitDate: args.limitDate,
        manager: args.manager,
        status: args.status,
      },
      { new: true }
    );
    return result;
  }

  @Mutation(() => Project)
  async deleteProject(@Arg('id') args: ProjectId): Promise<Project | null> {
    const isProjectExist = await ProjectModel.findById({ _id: args._id });
    if (!isProjectExist) throw new ApolloError("Le projet n'existe pas");
    const result = await ProjectModel.findByIdAndDelete({ _id: args._id });
    return result;
  }
}

export default ProjectResolver;