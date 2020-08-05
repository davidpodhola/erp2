import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { BaseEntityService } from './base.entity.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TaxService, TaxServiceKey } from './tax.service';
import { ProductService, ProductServiceKey } from './product.service';
import { SalesInvoiceService } from './sales.invoice.service';
import { SalesInvoiceLine } from './entity.base';

export const SalesInvoiceLineServiceKey = 'SalesInvoiceLineService';

@Injectable()
export class SalesInvoiceLineService extends BaseEntityService<
  SalesInvoiceLineModel,
  SalesInvoiceLineSaveArgsModel
> {
  createEntity(): SalesInvoiceLineModel {
    return new SalesInvoiceLine();
  }

  protected getRepository(
    transactionalEntityManager
  ): Repository<SalesInvoiceLineModel> {
    return transactionalEntityManager.getRepository(SalesInvoiceLine);
  }

  constructor(
    @Inject(TaxServiceKey) public readonly taxService: TaxService,
    @Inject(ProductServiceKey) public readonly productService: ProductService,
    @Inject(forwardRef(() => SalesInvoiceService))
    public readonly salesInvoiceService: SalesInvoiceService
  ) {
    super();
  }

  protected async doSave(
    transactionalEntityManager: EntityManager,
    args: SalesInvoiceLineSaveArgsModel,
    line: SalesInvoiceLineModel
  ): Promise<SalesInvoiceLineModel> {
    line.lineTax =
      args.lineTax ||
      (args.lineTaxIsStandard
        ? await this.taxService.getStandardTax(transactionalEntityManager)
        : await this.taxService.loadEntity(
            transactionalEntityManager,
            args.lineTaxId
          ));
    line.product =
      args.product ||
      (args.productSku
        ? await this.productService.getProduct(
            transactionalEntityManager,
            args.productSku
          )
        : await this.productService.loadEntity(
            transactionalEntityManager,
            args.productId
          ));
    line.lineOrder = args.lineOrder;

    const invoice =
      args.invoice ||
      (await this.salesInvoiceService.loadEntity(
        transactionalEntityManager,
        args.invoiceId
      ));
    line.invoice = invoice;
    await invoice.customer;
    line.linePrice = args.linePrice;
    line.quantity = args.quantity;
    line.narration = args.narration;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }
}
