import {
  ObjectType,
  Field,
  InputType,
  ID,
  registerEnumType,
} from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { Length } from 'class-validator';
/* eslint max-classes-per-file: ["error", 2] */

enum TicketStatus {
  ToDo = 'TODO',
  Doing = 'DOING',
  Done = 'DONE',
}
registerEnumType(TicketStatus, {
  name: 'TicketStatus', // this one is mandatory
  description: 'the allowed statuses for a ticket', // this one is optional
});

@ObjectType()
export class Ticket {
  @Field(() => ID!)
  readonly _id: string;

  @Property()
  @Field()
  @Length(1, 40)
  title!: string;

  @Property()
  @Field()
  @Length(0, 255)
  description?: string;

  @Property()
  @Field({ description: 'date of creation of the ticket' })
  creationDate?: string;

  @Property()
  @Field(() => TicketStatus)
  status?: TicketStatus;

  @Property()
  @Field()
  assignee?: string;

}
export const TicketModel = getModelForClass(Ticket);

@InputType({ description: 'New ticket data' })
export class NewTicketInput implements Partial<Ticket> {
  @Field()
  @Length(1, 40)
  title!: string;

  @Field()
  @Length(0, 255)
  description?: string = '';

  @Field(() => TicketStatus)
  status?: TicketStatus = TicketStatus.ToDo;

  @Field()
  assignee: string = '';
}
