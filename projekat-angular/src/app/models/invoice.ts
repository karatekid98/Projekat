export interface Invoice {
  date: Date;
  customerId: string;
  issuerId: string;
  isPrinted: boolean;
  shipments: object;
  invoiceProducts: object;
  user: object;
  customer: object;
  id: string;
  isDeleted: boolean;
}
