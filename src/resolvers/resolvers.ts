import { Resolver, Query } from 'type-graphql';
import TicketModel from '../models/Ticket';
import Ticket from '../entities/Ticket';


@Resolver()
class TicketResolver {

  @Query(() => [Ticket])
  async getAllTickets() {
    const result = await TicketModel.find();
    return result;
  }
}

export default TicketResolver;

// // const tickets = [
//   // {
//   //   title: 'The Awakening',
//   //   description: 'Kate Chopin',
//   // },
// //   {
// //     title: 'City of Glass',
// //     description: 'Paul Auster',
// //   },
// // ];

// const resolvers = {
//   Query: {
//     getAllTickets: async () => {
//       const result = await TicketModel.find();
//       return result;
//     },
//   },
//   Mutation: {
//     createTicket: async (_: any, args: any) => {
//       const ticket = new TicketModel({
//         title: args.title,
//         description: args.description,
//       });
//       const result = await ticket.save();
//       return result;
//     },
//   },
// };

// export default resolvers;
