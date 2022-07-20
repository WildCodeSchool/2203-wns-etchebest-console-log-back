import 'reflect-metadata';
import { buildSchema, NonEmptyArray } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '@generated/type-graphql';
// eslint-disable-next-line import/no-cycle
import { CustomUserResolver, LoginResolver } from './resolvers/User';

// const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
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
    context: (): Context => ({ prisma }),
  });
  const port = 4000;

  server.listen(port).then(({ url }: { url: any }) => {
    console.log(`🚀  Server ready at ${url}`); // eslint-disable-line no-console
  });
};

initialize().catch((error) => console.log(error)); // eslint-disable-line no-console
