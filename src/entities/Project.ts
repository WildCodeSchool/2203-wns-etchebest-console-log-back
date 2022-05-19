import { ObjectType, Field, InputType, ID } from 'type-graphql';
import {
  getModelForClass,
  prop as Property,
  modelOptions,
  Severity,
} from '@typegoose/typegoose';
import { MaxLength } from 'class-validator';
import { ObjectId } from 'mongodb';
import { Ticket } from './Ticket';

/* eslint max-classes-per-file: ["error", 10] */
@modelOptions({ options: { allowMixed: Severity.ALLOW } }) // Permet de récupérer le type Ticket dans la classe Project
@ObjectType()
class Project {
  @Field(() => ID!)
  _id?: ObjectId;

  @Property()
  @Field(() => String)
  @MaxLength(50)
  name: string;

  @Property()
  @Field(() => Date)
  creationDate: Date;

  @Property()
  @Field(() => Date)
  limitDate: Date;

  @Property()
  @Field(() => String)
  status: string;

  @Property()
  @Field(() => String)
  manager: string;

  @Property()
  @Field(() => [Ticket])
  tickets?: Ticket[];
}

export const ProjectModel = getModelForClass(Project);

@InputType()
class ProjectId implements Partial<Project> {
  @Field(() => ID!)
  _id: ObjectId;
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
  @Field(() => ID!)
  _id: ObjectId;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  limitDate?: Date;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  manager?: string;
}

export { Project, NewProjectInput, ProjectId, UpdateProjectInput };
