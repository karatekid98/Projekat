export interface SingUp {
  AddressDto: {
    city: string;
    country: string;
    postcode: string;
    line: string;
  };
  UserDto: {
    firstName: string;
    lastName: string;
    phone: string;
    dateOfBirth: Date;
    gender: string;
    addressId?: string;
    email: string;
    password: string;
  };
}
