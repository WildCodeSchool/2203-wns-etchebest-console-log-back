import 'reflect-metadata';
import { PrismaClient, User } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { buildSchema, NonEmptyArray, Authorized } from 'type-graphql';
import {
  resolvers,
  ResolversEnhanceMap,
  applyResolversEnhanceMap,
} from '@generated/type-graphql';
import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-cycle
import { CustomUserResolver, jwtKey, LoginResolver } from './resolvers/User';
// eslint-disable-next-line import/no-cycle
import customAuthChecker from './auth';
// import resolversEnhanceMap from './resolvers/enhanceMap';

export interface Context {
  prisma: PrismaClient;
  user?: User;
}

const initialize = async () => {
  const resolversEnhanceMap: ResolversEnhanceMap = {
    Project: {
      createOneProject: [Authorized()],
    },
  };
  applyResolversEnhanceMap(resolversEnhanceMap);
  const schema = await buildSchema({
    resolvers: [
      ...resolvers,
      resolversEnhanceMap,
      CustomUserResolver,
      LoginResolver,
    ] as NonEmptyArray<any>,
    validate: false,
    authChecker: customAuthChecker,
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
