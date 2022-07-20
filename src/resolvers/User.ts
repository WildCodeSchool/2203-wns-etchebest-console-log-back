import { Query, Resolver, Ctx, NonEmptyArray } from 'type-graphql';
// eslint-disable-next-line import/no-cycle
import { Context } from '../server';
import { User } from '../../node_modules/@generated/type-graphql';

@Resolver(() => User)
class CustomUserResolver {
  @Query(() => User, { nullable: true })
  async bestUser(@Ctx() { prisma }: Context): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: { email: 'email@email.fr' },
    });
    return user;
  }
}

export default CustomUserResolver as unknown as NonEmptyArray<Function>;
