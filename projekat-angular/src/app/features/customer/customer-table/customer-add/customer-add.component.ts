import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/core/services/customer-service/customer.service';
import { Customer } from 'src/app/models/customer';
import { CustomerForm } from '../../../../models/customerForm';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss', '../../../user/user-table/user-add/user-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  selected = 'Female';
  formFilled = true;

  public customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    companyNumber: '',
    addressId: null,
};


  public addCustomer: CustomerForm = {
    AddressDto: {
      country: '',
      city: '',
      line: '',
      postcode: '',
    },
    CustomerDto: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      companyNumber: ''
    },
  };

  genders = ['Female', 'Male'];

  hide = true;
  confirmhide = true;

  detailForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    companyNumber: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required),
  });

  get email(): any {
    return this.detailForm.get('email');
  }


  constructor(private customerService: CustomerService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  finishSingup(): void {
      this.fillOutForm();
      this.customerService.addCustomer(this.addCustomer).subscribe(
        (response) => {
          this.customer.firstName = response.firstName;
          this.customer.lastName = response.lastName;
          this.customer.gender = response.gender;
          this.customer.companyNumber = response.companyNumber ;
          this.customer.email = response.email;
          this.customer.phone = response.phone;
          this.formFilled = true;
          this.openSnackBar();
          this.router.navigate(['admin-home-page/customer']);
        },
        (error) => {
          this.formFilled = false;
          console.log(error.error);
        }
      );
  }

  fillOutForm(): void {
    this.addCustomer.CustomerDto.firstName = this.detailForm.value.firstName;
    this.addCustomer.CustomerDto.lastName = this.detailForm.value.lastName;
    this.addCustomer.CustomerDto.gender = this.detailForm.value.gender;
    this.addCustomer.CustomerDto.companyNumber = this.detailForm.value.companyNumber;
    this.addCustomer.CustomerDto.email = this.detailForm.value.email;
    this.addCustomer.CustomerDto.phone = this.detailForm.value.phoneNumber;

    this.addCustomer.AddressDto.country = this.detailForm.value.country;
    this.addCustomer.AddressDto.city = this.detailForm.value.city;
    this.addCustomer.AddressDto.postcode = this.detailForm.value.postcode;
    this.addCustomer.AddressDto.line = this.detailForm.value.line;
  }

  openSnackBar(): void {
    this.snackBar.open('Customer successfully added!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });

  }

  backToCustomerTable(): void  {
    this.router.navigate([`/admin-home-page/customer/`]);
  }


}
