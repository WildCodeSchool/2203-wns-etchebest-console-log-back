import mongoose from 'mongoose';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '@generated/type-graphql';
import ProjectResolver from './resolvers/ProjectResolver';
import TicketResolver from './resolvers/TicketResolver';
import CustomTicketResolver from './resolvers/CustomResolver';

const prisma = new PrismaClient();

const { ApolloServer } = require('apollo-server');

mongoose
  .connect('mongodb://127.0.0.1:27017/console-log-db', {
    autoIndex: true,
  })
  .then(() => console.log('Connected to database')) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console

const initialize = async () => {
  const schema = await buildSchema({
    resolvers,
    validate: false,
  });

  const server = new ApolloServer({ schema, context: () => ({ prisma }) });

  server.listen().then(({ url }: { url: any }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
  });
};

initialize();
