import { SalesInvoiceLineModel } from './sales.invoice.line.model';
import { SalesInvoiceLineSaveArgsModel } from './sales.invoice.line.save.args.model';
import { EntityManager, Repository } from 'typeorm';
import { SalesInvoiceLine } from './sales.invoice.line';
import { BaseEntityService } from './base.entity.service';
import { Inject } from '@nestjs/common';
import { AddressService, AddressServiceKey } from '@erp2/model';
import { TaxService, TaxServiceKey } from './tax.service';
import { ProductService, ProductServiceKey } from './product.service';

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
    @Inject(ProductServiceKey) public readonly productService: ProductService
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
      : await productService.loadEntity(args.productId);
    line.product = Promise.resolve(product);
    line.lineOrder = args.lineOrder;

    const invoice = args.invoice
      ? args.invoice
      : await salesInvoiceService.loadEntity(args.invoiceId);
    line.invoice = Promise.resolve(invoice);

    const customer = await invoice.customer;
    const customerGroup = await customerGroupService.findCustomerGroup(
      customer
    );
    const customerPriceListModel = customerGroup
      ? await customerPriceListService.loadByCustomerGroupAndProduct(
          customerGroup,
          product
        )
      : null;
    const customerProductPriceModel: CustomerProductPriceModel = customerPriceListModel
      ? await find(
          await customerPriceListModel.productPrices,
          async (x: CustomerProductPriceModel) =>
            (await x.product).id === (await line.product).id
        )
      : null;

    line.linePrice = customerProductPriceModel
      ? customerProductPriceModel.sellingPrice * args.quantity
      : args.linePrice;
    line.quantity = args.quantity;
    line.narration = args.narration;

    return line;
  }

  typeName(): string {
    return SalesInvoiceLineServiceKey;
  }
}
