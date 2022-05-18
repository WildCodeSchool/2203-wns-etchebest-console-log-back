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

export { Project, NewProjectInput };
