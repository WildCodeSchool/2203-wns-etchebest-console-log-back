import 'reflect-metadata';
import { PrismaClient, User } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { resolvers } from '@generated/type-graphql';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-cycle
import { CustomUserResolver, jwtKey, LoginResolver } from './resolvers/User';

// const prisma = new PrismaClient();
export interface Context {
  prisma: PrismaClient;
  user?: User;
}

const initialize = async () => {
  const schema = await buildSchema({
    resolvers: [
      ...resolvers,
      CustomUserResolver,
      LoginResolver,
    ] as NonEmptyArray<any>,
    validate: false,
  });

  const prisma = new PrismaClient();
  await prisma.$connect();

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const token = req.headers.authorization;
      if (token) {
        try {
          const user = jwt.verify(token, jwtKey);
          return { user, prisma };
        } catch (e) {
          console.error(e); // eslint-disable-line no-console
        }
      }
      return { prisma };
    },
  });
  const port = 4000;

  server.listen(port).then(({ url }: { url: any }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
  });
};

initialize().catch((error) => console.log(error)); // eslint-disable-line no-console
