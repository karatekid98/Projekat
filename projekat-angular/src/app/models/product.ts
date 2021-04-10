export interface Product {
  name: string;
  unit: string;
  price: number;
  description: string;
  dateAdded: Date;
  availableQuantity: number;
  invoiceProducts: any;
  isDeleted: boolean;
}
