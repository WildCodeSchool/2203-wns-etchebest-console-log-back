import { ObjectType, Field, InputType } from 'type-graphql';
/* eslint max-classes-per-file: ["error", 2] */

@ObjectType()
class Ticket {
  @Field()
  title: string='';

  @Field()
  description?: string;
}

@InputType({ description: "New ticket data" })
class NewTicketInput implements Partial<Ticket> {
  @Field()
  title: string=''

  @Field()
  description?: string;
}

export {Ticket, NewTicketInput};

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
// const typeDefs = gql`
//   # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

//   type Ticket {
//     title: String
//     description: String
//   }

//   type Query {
//     getAllTickets: [Ticket]
//   }

//   type Mutation {
//     createTicket(title: String, description: String): Ticket
//   }
// `;

// export default typeDefs;
