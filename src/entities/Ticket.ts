import { ObjectType, Field, InputType, ID } from 'type-graphql';
import { getModelForClass, prop as Property } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
/* eslint max-classes-per-file: ["error", 2] */

@ObjectType()
export class Ticket {
  @Field(() => ID!, { nullable: true, name: 'id' })
  _id?: ObjectId;


  @Property()
  @Field({nullable: true})
  title?: string;


  @Property()
  @Field({nullable: true})
  description?: string;
}
 export const TicketModel = getModelForClass(Ticket);

@InputType({ description: 'New ticket data' })
export class NewTicketInput implements Partial<Ticket> {
  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;
}