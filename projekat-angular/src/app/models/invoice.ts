export interface Invoice {
  date: Date;
  customerId: string;
  issuerId: string;
  isPrinted: boolean;
  shipments: object;
  invoiceProducts: object;
  user: object;
  customer: object;
  isDeleted: boolean;
  id?: any;
}
