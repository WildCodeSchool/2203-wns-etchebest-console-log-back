import { ObjectType, Field, InputType, ID } from 'type-graphql';
/* eslint max-classes-per-file: ["error", 2] */

@ObjectType()
class Project {
  @Field(() => ID)
  readonly _id: string | undefined;

  @Field()
  name: string;

  @Field()
  creationDate: Date;

  @Field()
  limitDate: Date;

  @Field()
  status: string;

  @Field()
  manager: string;
}

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
