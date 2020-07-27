import { Query, Resolver } from '@nestjs/graphql';
import { DateTimeScalarType } from './support/date.scalar';

@Resolver()
export class AppResolver {
  @Query(() => DateTimeScalarType)
  async now(): Promise<Date> {
    return new Date();
  }
}
