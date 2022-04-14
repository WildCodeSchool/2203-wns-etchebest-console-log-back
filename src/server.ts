import mongoose from 'mongoose';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
// import Ticket from './entities/Ticket';
import TicketResolver from './resolvers/TicketResolver';

// import wilderController from './controllers/wilder';

const { ApolloServer } = require('apollo-server');

// Database
mongoose
  .connect('mongodb://127.0.0.1:27017/console-log-db', {
    autoIndex: true,
  })
  .then(() => console.log('Connected to database')) // eslint-disable-line no-console
  .catch((err) => console.log(err)); // eslint-disable-line no-console


const bootstrap = async () => {
  const schema = await buildSchema ({
    resolvers: [TicketResolver],
    emitSchemaFile: true,
  });

  const server = new ApolloServer({ schema });

  // The `listen` method launches a web server.
  server.listen().then(({ url } : {url:any}) => {
    console.log(`🚀  Server ready at ${url}`);
  });

};

bootstrap();
