import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Ticket, NewTicketInput, GetTicketInput, TicketModel } from '../entities/Ticket';

@Resolver()
class TicketResolver {
  @Query(() => [Ticket])
  async getAllTickets(): Promise<Ticket[]> {
    const result = await TicketModel.find();
    return result;
  }

  @Query(() => Ticket)
  async getTicket(@Arg('getTicketInput') args: GetTicketInput): Promise<Ticket | null> {
    const result = await TicketModel.findById({ _id: args._id });
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
