import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AddressService, AddressServiceKey, Customer, CustomerService, CustomerServiceKey } from '@erp2/model';
import { Inject, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@erp2/auth';
import { getManager } from 'typeorm';

@Resolver(() => Customer )
@UseGuards(new GqlAuthGuard())
export class CustomerResolver {
  constructor(
    @Inject(CustomerServiceKey) protected readonly customerService: CustomerService,
    @Inject(AddressServiceKey) protected readonly addressService: AddressService
  ) {
  }

  @Query(()=>[Customer])
  async customers() {
    return await this.customerService.loadEntities(getManager())
  }

  @Query(() => Customer)
  async author(@Args('id', { type: () => Int }) id: number) {
    return await this.customerService.loadEntityById(getManager(), id);
  }

  @ResolveField()
  async legalAddress(@Parent() customer: Customer) {
    const entityManager = getManager();
    const { id } = customer;
    const { customer_legalAddressId } =
      await this.customerService.createQueryBuilder(entityManager, `customer`).where(`customer.id=:id`, {id} ).getRawOne();
    return this.addressService.loadEntityById(entityManager, customer_legalAddressId);
  }
}
