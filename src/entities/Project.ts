import { ObjectType, Field, InputType, ID } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';

/* eslint max-classes-per-file: ["error", 10] */

@ObjectType()
class Project {
  @Field(() => ID)
  readonly _id: string | undefined;

  @Property()
  @Field()
  name: string;

  @Property()
  @Field()
  creationDate: Date;

  @Property()
  @Field()
  limitDate: Date;

  @Property()
  @Field()
  status: string;

  @Property()
  @Field()
  manager: string;
}

export const ProjectModel = getModelForClass(Project);

@InputType({ description: 'Find projet by id' })
class ProjectIdInput implements Partial<Project> {
  @Field()
  _id: string;
}

@InputType({ description: 'New project data' })
class NewProjectInput implements Partial<Project> {
  @Field()
  name: string;

  @Field()
  limitDate: Date;

  @Field()
  status: string;

  @Field()
  manager: string;
}

@InputType({ description: 'Update project data' })
class UpdateProjectInput implements Partial<Project> {
  @Field()
  _id: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  limitDate?: Date;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  manager?: string;
}

export { Project, NewProjectInput, ProjectIdInput, UpdateProjectInput };
