import { ObjectType, Field, InputType, ID } from 'type-graphql';
/* eslint max-classes-per-file: ["error", 2] */

@ObjectType()
class Ticket {
  @Field(() => ID)
  readonly _id: string | undefined;

  @Field()
  title: string = '';

  @Field()
  description?: string;
}

@InputType({ description: 'New ticket data' })
class NewTicketInput implements Partial<Ticket> {
  @Field()
  title: string = '';

  @Field()
  description?: string;
}

export { Ticket, NewTicketInput };
