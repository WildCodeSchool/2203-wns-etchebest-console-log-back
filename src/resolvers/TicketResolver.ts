import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Ticket, NewTicketInput, TicketModel } from '../entities/Ticket';

@Resolver()
class TicketResolver {
  @Query(() => [Ticket])
  async getAllTickets(): Promise<Ticket[]> {
    const result = await TicketModel.find();
    return result;
  }

  @Mutation(() => Ticket)
  async createTicket(
    @Arg('newTicketInput') newTicketInput: NewTicketInput
  ): Promise<Ticket> {
    const date = new Date().toISOString();
    const ticket = await new TicketModel({
      ...newTicketInput,
      creationDate: date,
    });
    const result = await ticket.save();
    return result;
  }
}

export default TicketResolver;
