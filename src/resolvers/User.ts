/* eslint-disable max-classes-per-file */
import {
  Query,
  Resolver,
  Ctx,
  Arg,
  InputType,
  Field,
  Authorized,
} from 'type-graphql';
import { ApolloError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-cycle
import { Context } from '../server';
import { User } from '../../node_modules/@generated/type-graphql';

export const jwtKey =
  'superlongString_because_console_log_are_the_best_way_to_debug_this_project';

@InputType({ description: 'login input' })
class UserLoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: 'register input' })
class UserRegisterInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  password: string;
}

@Resolver(() => User)
class CustomUserResolver {
  @Authorized()
  @Query(() => User, { nullable: true })
  async bestUser(@Ctx() { prisma }: Context) {
    const user = await prisma.user.findFirst({
      where: { email: 'email@email.fr' },
    });
    return user;
  }
}

@Resolver()
class LoginResolver {
  @Query(() => String)
  async login(
    @Arg('UserLoginInput') args: UserLoginInput,
    @Ctx() { prisma }: Context
  ) {
    const { email, password } = args;
    const foundUser = await prisma.user.findFirst({
      where: { email },
    });
    if (foundUser && bcrypt.compareSync(password, foundUser.hash)) {
      const token = jwt.sign(
        {
          user: foundUser.email,
        },
        jwtKey
      );
      return token;
    }
    return new ApolloError('User not found');
  }
}

@Resolver()
class RegisterResolver {
  @Query(() => User)
  async register(
    @Arg('UserRegisterInput') args: UserRegisterInput,
    @Ctx() { prisma }: Context
  ) {
    const { email, name, password } = args;
    const foundUser = await prisma.user.findFirst({
      where: { email },
    });
    if (foundUser) {
      return new ApolloError('User already exists');
    }
    const hash = bcrypt.hashSync(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        hash,
      },
    });
    return newUser;
  }
}

export { CustomUserResolver, LoginResolver, RegisterResolver };
