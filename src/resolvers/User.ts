/* eslint-disable max-classes-per-file */
import { Query, Resolver, Ctx, Arg, InputType, Field } from 'type-graphql';
import { ApolloError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-cycle
import { Context } from '../server';
import { User } from '../../node_modules/@generated/type-graphql';

const jwtKey =
  'superlongString_because_console_log_are_the_best_way_to_debug_this_project';

@InputType({ description: 'login input' })
class UserLoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field({ nullable: true })
  password: string;
}

@Resolver(() => User)
class CustomUserResolver {
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
  @Query()
  async login(
    @Arg('UserLoginInput') args: UserLoginInput,
    @Ctx() { prisma }: Context
  ) {
    const { email, password } = args;
    console.log(email, password);
    const foundUser = await prisma.user.findFirst({
      where: { email },
    });
    console.log(foundUser);
    if (foundUser && bcrypt.compareSync(password, foundUser.hash)) {
      const token = jwt.sign(
        {
          user: foundUser.email,
        },
        jwtKey
      );
      console.log(token);
      return token;
    }

    return new ApolloError('User not found');
  }
}

export { CustomUserResolver, LoginResolver };
