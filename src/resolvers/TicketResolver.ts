import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Ticket, NewTicketInput, TicketModel } from '../entities/Ticket';

@Resolver()
class TicketResolver {
  @Query(() => [Ticket])
  async getAllTickets() {
    const result = await TicketModel.find();
    return result;
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Arg('newTicketInput') args: NewTicketInput
  ): Promise<Ticket> {
    const ticket = new TicketModel({
      title: args.title,
      description: args.description,
    });
    const result = await ticket.save();
    return result;
  }
}

export default TicketResolver;
