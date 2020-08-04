import { AddressService, BaseEntityService, Customer } from '@erp2/model';
import { CustomerModel } from './customer.model';
import { CustomerSaveArgsModel } from './customer.save.args.model';
import { EntityManager, Repository } from 'typeorm/index';

export const CustomerServiceKey = 'CustomerService';

export class CustomerService extends BaseEntityService<
  CustomerModel,
  CustomerSaveArgsModel
> {
  createEntity(): CustomerModel {
    return new Customer();
  }

  protected getRepository(transactionalEntityManager): Repository<CustomerModel>{
    return transactionalEntityManager.getRepository(Customer);
  }
  constructor(
    protected readonly addressService: AddressService
  ) {
    super();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: CustomerSaveArgsModel,
    customer: CustomerModel
  ): Promise<CustomerModel> {
    const address = await this.addressService.save(
      transactionalEntityManager,
      args.legalAddress
    );

    customer.displayName = args.displayName;
    customer.vatNumber = args.vatNumber;
    customer.legalName = args.legalName;
    customer.invoicingEmail = args.invoicingEmail;
    customer.legalAddress = address;
    customer.idNumber = args.idNumber;
    return customer;
  }

  typeName(): string {
    return CustomerServiceKey;
  }

  getCustomer = (transactionalEntityManager: EntityManager,displayName: string) =>
    this.getRepository(transactionalEntityManager).findOne({ where: { displayName } })
}
