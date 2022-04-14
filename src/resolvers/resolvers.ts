import TicketModel from '../models/Ticket';

// const tickets = [
//   {
//     title: 'The Awakening',
//     description: 'Kate Chopin',
//   },
//   {
//     title: 'City of Glass',
//     description: 'Paul Auster',
//   },
// ];

const resolvers = {
  Query: {
    getAllTickets: async () => {
      const result = await TicketModel.find();
      return result;
    },
  },
  Mutation: {
    createTicket: async (_: any, args: any) => {
      const ticket = new TicketModel({
        title: args.title,
        description: args.description,
      });
      const result = await ticket.save();
      return result;
    },
  },
};

export default resolvers;
