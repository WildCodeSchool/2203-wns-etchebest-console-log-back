import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import { resolvers } from '@generated/type-graphql';

// const prisma = new PrismaClient();

interface Context {
  prisma: PrismaClient;
}

const initialize = async () => {
  const schema = await buildSchema({
    resolvers,
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
