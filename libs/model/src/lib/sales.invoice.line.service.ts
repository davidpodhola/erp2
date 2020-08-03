import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { SalesInvoiceLine } from './sales.invoice.line';
import { BaseEntityService } from './base.entity.service';
import { Inject } from '@nestjs/common';
import { AddressService, AddressServiceKey } from '@erp2/model';
import { TaxService, TaxServiceKey } from './tax.service';
import { ProductService, ProductServiceKey } from './product.service';
import { SalesInvoiceService, SalesInvoiceServiceKey } from './sales.invoice.service';

export const SalesInvoiceLineServiceKey = 'SalesInvoiceLineService';

export class SalesInvoiceLineService extends BaseEntityService<
  SalesInvoiceLineModel,
  SalesInvoiceLineSaveArgsModel
> {
  createEntity(): SalesInvoiceLineModel {
    return new SalesInvoiceLine();
  }

  protected getRepository(transactionalEntityManager): Repository<SalesInvoiceLineModel>{
    return transactionalEntityManager.getRepository(SalesInvoiceLine);
  }

  constructor(
    @Inject(AddressServiceKey) public readonly addressService: AddressService,
    @Inject(TaxServiceKey) public readonly taxService: TaxService,
    @Inject(ProductServiceKey) public readonly productService: ProductService,
    @Inject(SalesInvoiceServiceKey) public readonly salesInvoiceService: SalesInvoiceService
  ) {
    super();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceLineSaveArgsModel,
    line: SalesInvoiceLineModel
  ): Promise<SalesInvoiceLineModel> {
    line.lineTax =
      args.lineTax ? args.lineTax : await this.taxService.loadEntity(transactionalEntityManager, args.lineTaxId);
    const product = args.product
      ? args.product
      : await this.productService.loadEntity(transactionalEntityManager, args.productId);
    line.product = product;
    line.lineOrder = args.lineOrder;

    const invoice = args.invoice
      ? args.invoice
      : await this.salesInvoiceService.loadEntity(transactionalEntityManager, args.invoiceId);
    line.invoice = invoice;

    const customer = await invoice.customer;
    line.linePrice = args.linePrice;
    line.quantity = args.quantity;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }
}
