import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DateTimeScalarType } from './support/date.scalar';

@Resolver()
export class AppResolver {
  @Query(() => DateTimeScalarType)
  async now(): Promise<Date> {
    return new Date();
  }

  @Mutation(() => DateTimeScalarType)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async keepAlive(
    @Args({ name: 'clientId', type: () => String }) clientId: string
  ) {
    return new Date();
  }
}
