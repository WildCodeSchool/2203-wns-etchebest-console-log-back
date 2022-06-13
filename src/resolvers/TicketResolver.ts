import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import {
  Ticket,
  NewTicketInput,
  TicketId,
  UpdateTicketInput,
  TicketModel,
} from '../entities/Ticket';

@Resolver()
class TicketResolver {
  @Query(() => [Ticket])
  async getAllTickets(): Promise<Ticket[]> {
    const result = await TicketModel.find();
    return result;
  }

  @Query(() => Ticket)
  async getTicket(@Arg('id') args: TicketId): Promise<Ticket | null> {
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

  @Mutation(() => Ticket)
  async updateTicket(
    @Arg('updateTicketInput') args: UpdateTicketInput
  ): Promise<Ticket | null> {
    const isTicketExist = await TicketModel.findById({ _id: args._id });
    if (!isTicketExist) throw new ApolloError("Le ticket n'existe pas");

    const result = await TicketModel.findOneAndUpdate(
      { _id: args._id },
      {
        title: args.title,
        description: args.description,
        status: args.status,
        assignee: args.assignee,
      }
    );
    return result;
  }

  @Mutation(() => Ticket)
  async deleteTicket(@Arg('id') args: TicketId): Promise<Ticket | null> {
    const isTicketExist = await TicketModel.findById({ _id: args._id });
    if (!isTicketExist) throw new ApolloError("Le projet n'existe pas");
    const result = await TicketModel.findByIdAndDelete({ _id: args._id });
    return result;
  }
}

export default TicketResolver;
