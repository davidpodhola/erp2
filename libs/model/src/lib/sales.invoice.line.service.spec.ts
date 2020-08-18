import { Test } from '@nestjs/testing';
import { ProductModel } from './product.model';
import { CustomerModel } from './customer.model';
import { SalesInvoiceModel } from './sales.invoice.model';
import {
  ProductServiceKey,
  SalesInvoiceLineService,
  SalesInvoiceServiceKey,
  SaveArgsValidationService,
  SaveArgsValidationServiceKey,
  TaxServiceKey,
} from '@erp2/model';

const customer: CustomerModel = {
  invoicingEmail: '',
  idNumber: '',
  id: 0,
  displayName: '',
  legalName: '',
  legalAddress: {} as any,
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
  organization: {} as any,
  dueDate: new Date(),
  bankAccount: {} as any,
  printed: false,
  issuedOn: new Date(),
  grandTotalAccountingSchemeCurrency: 0,
  grandTotal: 0,
  totalLinesAccountingSchemeCurrency: 0,
};

const product: ProductModel = {
  sku: '',
  id: 0,
  displayName: '',
};

const PRODUCT_PRICE = 123;
const QUANTITY = 10;

const mockTaxService = {};
export const mockTaxServiceProvider = {
  provide: TaxServiceKey,
  useValue: mockTaxService,
};
const mockProductService = {};
export const mockProductServiceProvider = {
  provide: ProductServiceKey,
  useValue: mockProductService,
};
const mockSalesInvoiceService = {};
export const mockSalesInvoiceServiceProvider = {
  provide: SalesInvoiceServiceKey,
  useValue: mockSalesInvoiceService,
};

const mockEntityManager = {
  getRepository: () => ({
    save: (x) => x,
  }),
} as any;

(global as any).moduleRef = {
  get: (token) =>
    token === SalesInvoiceServiceKey
      ? mockSalesInvoiceService
      : new SaveArgsValidationService(),
};

const saveArgsValidationServiceProvider = {
  provide: SaveArgsValidationServiceKey,
  useClass: SaveArgsValidationService,
};

describe('SalesInvoiceLineService', () => {
  let service: SalesInvoiceLineService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [
        SalesInvoiceLineService,
        mockTaxServiceProvider,
        mockProductServiceProvider,
        mockSalesInvoiceServiceProvider,
        saveArgsValidationServiceProvider,
      ],
    }).compile();

    service = app.get<SalesInvoiceLineService>(SalesInvoiceLineService);
  });

  it('line price is taken from the linePrice field (no calculation yet)', async () => {
    const line = await service.save(mockEntityManager, {
      narration: '',
      linePrice: 2 * QUANTITY,
      invoice,
      lineOrder: 0,
      quantity: QUANTITY,
      lineTax: {} as any,
      product,
    });
    expect(line.linePrice).toBe(2 * QUANTITY);
  });
});
