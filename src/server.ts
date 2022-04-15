import mongoose from 'mongoose';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import TicketResolver from './resolvers/TicketResolver';

const { ApolloServer } = require('apollo-server');

mongoose
  .connect('mongodb://127.0.0.1:27017/console-log-db', {
    autoIndex: true,
  })
  .then(() => console.log('Connected to database')) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console

const initialize = async () => {
  const schema = await buildSchema({
    resolvers: [TicketResolver],
  });

  const server = new ApolloServer({ schema });

  server.listen().then(({ url }: { url: any }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
  });
};

initialize();
