import { Address } from './../../../models/address';
import { Component, HostListener, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../core/services/customer-service/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { AddressService } from 'src/app/core/services/address-service/address.service';
import { EditModalComponent } from 'src/app/shared/edit-modal/edit-modal.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss', '../../user/user-table/user-add/user-add.component.scss']
})
export class CustomerEditComponent implements OnInit {
  selected = 'Female';
  formFilled = true;
  id: any;
  initalValues: any;
  initalValuesAddress: any;
  customerAddressId: any;
  pageHeader = 'Edit customer';
  isButtonVisible = true;

  public customer: Customer = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: '',
      companyNumber: '',
      addressId: null,
      name: ''
  };

  public address: Address = {
    country: '',
    line: '',
    city: '',
    postcode: '',
  };

  detailForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    companyNumber: new FormControl('', Validators.required),
  });

  addressForm: FormGroup = new FormGroup({
    postcode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required)
  });

  @HostListener('window:popstate', ['$event'])
  onPopState(event): void {
    this.unlockItem(localStorage.getItem('lockedItem'));
    localStorage.removeItem('lockedItem');
  }

  get emailInput(): any {
    return this.detailForm.get('email');
  }

  constructor(private route: ActivatedRoute, private customerService: CustomerService,
              private router: Router,  public dialog: MatDialog, private addressService: AddressService,
              private lockService: LockService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem('lockedItem') === null) {
      this.pageHeader = 'Read-only customer';
      this.isButtonVisible = false;
      this.detailForm.disable();
      this.addressForm.disable();
    }
    this.id = this.getUrlParams();
    this.customerService.getCustomer(this.id).subscribe((customer) => {
      this.customer.addressId = customer.addressId;
      this.customer.id = customer.id;
      this.address.id = customer.addressId;
      this.selected = customer.gender;

      this.customerAddressId = customer.addressId;
      this.detailForm.patchValue(customer);
      this.detailForm.patchValue({
        gender: customer.gender

      });
      this.patchAddressForm();
      this.initalValues = this.detailForm.value;

    });

  }

  patchAddressForm(): void {
    this.addressService.getAddress(this.customerAddressId).subscribe((address) => {
      this.addressForm.patchValue(address);
      this.initalValuesAddress = this.addressForm.value;
    });
  }

  backToCustomerTable(): void {
    if (this.initalValues !== this.detailForm.value || this.initalValuesAddress !== this.addressForm.value) {
      this.openGoBackModal();
    } else {
      const itemId = localStorage.getItem('lockedItem');
      if (itemId !== null) {
        this.unlockItem(itemId);
        localStorage.removeItem('lockedItem');
        this.router.navigate([`/admin-home-page/customer`]);
      } else {
        this.router.navigate([`/admin-home-page/customer`]);
      }
    }
  }

  submit(): void {
    this.fillOutForm();

    if (this.detailForm.valid && this.addressForm.valid) {
      this.customerService.updateCustomer(this.customer, this.id).subscribe(
        (response) => {
          this.updateAddress(this.customerAddressId);
          this.formFilled = true;
          localStorage.removeItem('lockedItem');
          this.unlockItem(this.id);
          this.openSnackBar();
          this.router.navigate(['admin-home-page/customer']);
        },
        (error) => {
          this.formFilled = false;
          console.log(error.error);
        }
      );
    } else {
      this.formFilled = false;
    }
  }

  updateAddress(addressId: any): void {
    this.addressService.updateAddress(this.address, addressId).subscribe();
  }

  fillOutForm(): void {
    this.customer.firstName = this.detailForm.value.firstName;
    this.customer.lastName = this.detailForm.value.lastName;
    this.customer.gender = this.detailForm.value.gender;
    this.customer.email = this.detailForm.value.email;
    this.customer.phone = this.detailForm.value.phone;
    this.customer.companyNumber = this.detailForm.value.companyNumber;

    this.address.country = this.addressForm.value.country;
    this.address.city = this.addressForm.value.city;
    this.address.postcode = this.addressForm.value.postcode;
    this.address.line = this.addressForm.value.line;
  }

  openSnackBar(): void {
    this.snackBar.open('Customer successfully edited!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });

  }

  getUrlParams(): any {
    const newLocal = '_routerState';
    const url = this.route[newLocal].snapshot.url;
    const n = url.lastIndexOf('/');
    const result = url.substring(n + 1);

    return result;
  }

  openGoBackModal(): void{
    const dialogRef = this.dialog.open(EditModalComponent , {data: {component: 'customer'}});
   }

   unlockItem(lockedItemId: any): void {
    this.lockService.postUnlockItem(lockedItemId).subscribe();
   }

}
