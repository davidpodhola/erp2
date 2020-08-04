import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { BaseEntityService } from './base.entity.service';
import { Inject } from '@nestjs/common';
import { TaxService, TaxServiceKey } from './tax.service';
import { ProductService, ProductServiceKey } from './product.service';
import { SalesInvoiceService, SalesInvoiceServiceKey } from './sales.invoice.service';
import { SalesInvoiceLine } from '@erp2/model';

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
    line.product = args.product
      ? args.product
      : await this.productService.loadEntity(transactionalEntityManager, args.productId);
    line.lineOrder = args.lineOrder;

    const invoice = args.invoice
      ? args.invoice
      : await this.salesInvoiceService.loadEntity(transactionalEntityManager, args.invoiceId);
    line.invoice = invoice;
    await invoice.customer;
    line.linePrice = args.linePrice;
    line.quantity = args.quantity;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }
}
