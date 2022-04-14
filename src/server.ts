// import mongoose from 'mongoose';
import 'reflect-metadata';
import typeDefs from './entities/types';
import resolvers from './resolvers/resolvers';
// import wilderController from './controllers/wilder';

const { ApolloServer } = require('apollo-server');

// Database
// mongoose
//   .connect('mongodb://127.0.0.1:27017/wilderdb', {
//     autoIndex: true,
//   })
//   .then(() => console.log('Connected to database')) // eslint-disable-line no-console
//   .catch((err) => console.log(err)); // eslint-disable-line no-console



const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url } : {url:any}) => {
  console.log(`🚀  Server ready at ${url}`);
});
