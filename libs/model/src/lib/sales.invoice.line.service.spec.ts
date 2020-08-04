import { Test } from '@nestjs/testing';
import { SalesInvoiceLineService } from './sales.invoice.line.service';
import { ProductModel } from './product.model';
import { CustomerModel } from './customer.model';
import { SalesInvoiceModel } from './sales.invoice.model';

/*const mockAuthService = {};
export const mockAuthServiceProvider = {
  provide: Auth0Service,
  useValue: mockAuthService
};*/

const customer: CustomerModel = {
  invoicingEmail: '',
  idNumber: '',
  id: 0,
  displayName: '',
  legalName: '',
  legalAddress: {} as any
};

const invoice: SalesInvoiceModel = {
  printLanguage: undefined,
  reverseCharge: false,
  paymentTermInDays: 0,
  currencyMultiplyingRateToAccountingSchemeCurrency: 1,
  vatReport: [{} as any],
  isCalculated: false,
  isDraft: false,
  id: 0,
  lines: [{} as any],
  customer: customer,
  currency: {} as any,
  totalLines: 0,
  transactionDate: new Date(),
  organization: {  } as any,
  dueDate: new Date(),
  bankAccount: {} as any,
  printed: false,
  issuedOn: new Date(),
  grandTotalAccountingSchemeCurrency: 0,
  grandTotal: 0,
  totalLinesAccountingSchemeCurrency: 0
};

const product: ProductModel = {
  sku: '',
  id: 0,
  displayName: ''
};

const PRODUCT_PRICE = 123;
const QUANTITY = 10;

describe('SalesInvoiceLineService', () => {
  let service: SalesInvoiceLineService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [SalesInvoiceLineService]
    }).compile();

    service = app.get<SalesInvoiceLineService>(SalesInvoiceLineService);
  });

  it('line price is correctly calculated', async () => {
    const line = await service.save(null, {
      narration: '',
      linePrice: 0,
      invoice,
      lineOrder: 0,
      quantity: QUANTITY,
      lineTax: {} as any,
      product
    });
    expect(line.linePrice).toBe(QUANTITY * PRODUCT_PRICE);
  });
});
