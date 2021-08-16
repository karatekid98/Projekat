
export interface CustomerForm {
  AddressDto: {
    city: string;
    country: string;
    postcode: string;
    line: string;
  };
  CustomerDto: {
    firstName: string;
    lastName: string;
    phone: string;
    companyNumber: string;
    gender: string;
    addressId?: string;
    email: string;
    name: string;
  };
}
