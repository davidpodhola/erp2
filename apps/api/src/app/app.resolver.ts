import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DateTimeScalarType } from './support/date.scalar';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@erp2/auth';
import { CurrentUser } from '@erp2/auth';
import { DateService, DateServiceKey, UserModel } from '@erp2/model';

@Resolver()
@UseGuards(new GqlAuthGuard())
export class AppResolver {
  constructor(
    @Inject(DateServiceKey) protected readonly dateService: DateService
  ) {}

  @Query(() => DateTimeScalarType)
  async now(@CurrentUser() user: UserModel): Promise<Date> {
    console.log('*** user', user);
    return this.dateService.now(user);
  }

  @Mutation(() => DateTimeScalarType)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async keepAlive(
    @CurrentUser() user: UserModel,
    @Args({ name: 'clientId', type: () => String }) clientId: string
  ) {
    console.log('*** user', user);
    return this.dateService.now(user);
  }
}
