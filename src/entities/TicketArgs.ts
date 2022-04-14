import { Field, ArgsType } from 'type-graphql';

@ArgsType()
class GetTicketsArgs {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;  
}

export default GetTicketsArgs;