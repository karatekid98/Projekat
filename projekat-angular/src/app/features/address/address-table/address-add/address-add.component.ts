import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from '../../../../models/address';
import { AddressService } from '../../../../core/services/address-service/address.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-address-add',
  templateUrl: './address-add.component.html',
  styleUrls: ['./address-add.component.scss', '../../../user/user-table/user-add/user-add.component.scss']
})
export class AddressAddComponent implements OnInit {

  selected = 'Female';
  formFilled = true;
  public address: Address = {
    city: '',
    country: '',
    postcode: '',
    line: ''
  };

  email: '';
  genders = ['Female', 'Male'];

  hide = true;
  confirmhide = true;

  addressForm: FormGroup = new FormGroup({
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required),
    postcode: new FormControl('')
  });

  constructor(private addressService: AddressService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  finish(): void {
      this.fillOutForm();
      this.addressService.addAddress(this.address).subscribe(
        (response) => {
          this.formFilled = true;
          this.openSnackBar();
          this.router.navigate(['admin-home-page/address']);
        },
        (error) => {
          this.formFilled = false;
          console.log(error.error);
        }
      );
  }

  fillOutForm(): void {
    this.address.city = this.addressForm.value.city;
    this.address.country = this.addressForm.value.country;
    this.address.line = this.addressForm.value.line;
    this.address.postcode = this.addressForm.value.postcode;
  }

  openSnackBar(): void {
    this.snackBar.open('Address successfully added!', 'Close', {
      duration: 2000,
      panelClass: ['snackbar']
    });

  }

  backToAddressTable(): void  {
    this.router.navigate([`/admin-home-page/address/`]);
  }


}
