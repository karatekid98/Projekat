import { Address } from './../../../models/address';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { LockService } from 'src/app/core/services/lock-service/lock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserForm } from 'src/app/models/singup';
import { AddressService } from '../../../core/services/address-service/address.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../user-table/user-add/user-add.component.scss']
})
export class UserEditComponent implements OnInit {


  selected = 'Female';
  hide = true;
  confirmhide = true;
  formFilled = true;
  id: any;
  hasChange = false;
  initalValues: any;
  initalValuesAddress: any;
  userAddressId: any;
  pageHeader = 'Edit user';
  isButtonVisible = true;

  public user: User = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      gender: '',
      dateOfBirth: new Date(),
      role: null,
      addressId: null,
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
    date: new FormControl(new Date(), Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(3),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.min(3),
    ]),
  });

  addressForm: FormGroup = new FormGroup({
    postcode: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required)
  });

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    this.unlockItem(localStorage.getItem('lockedItem'));
    localStorage.removeItem('lockedItem');
  }

  get emailInput(): any {
    return this.detailForm.get('email');
  }
  get passwordInput(): any  {
    return this.detailForm.get('password');
  }
  get passwordInputConfirm(): any  {
    return this.detailForm.get('confirmPassword');
  }

  constructor(private route: ActivatedRoute, private userService: UserService,
              private router: Router,  public dialog: MatDialog, private addressService: AddressService,
              private lockService: LockService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem('lockedItem') === null) {
      this.pageHeader = 'Read-only user';
      this.isButtonVisible = false;
      this.detailForm.disable();
      this.addressForm.disable();
    }
    this.id = this.getUrlParams();
    this.userService.getUser(this.id).subscribe((user) => {
      this.user.addressId = user.addressId;
      this.user.role = user.role;
      this.user.id = user.id;
      this.address.id = user.addressId;
      this.selected = user.gender;

      this.userAddressId = user.addressId;
      this.detailForm.patchValue(user);
      this.detailForm.patchValue({
        date: user.dateOfBirth,
        confirmPassword: user.password
      });
      this.patchAddressForm();
      this.initalValues = this.detailForm.value;

    });

  }

  patchAddressForm(): void {
    this.userService.getUserAddress(this.userAddressId).subscribe((address) => {
      this.addressForm.patchValue(address[0]);
      this.initalValuesAddress = this.addressForm.value;
    });
  }

  backToUserTable(): void {
    if (this.initalValues !== this.detailForm.value || this.initalValuesAddress !== this.addressForm.value) {
      this.openGoBackModal();
    } else {
      const itemId = localStorage.getItem('lockedItem');
      if (itemId !== null) {
        this.unlockItem(itemId);
        localStorage.removeItem('lockedItem');
        this.router.navigate([`/admin-home-page/user`]);
      } else {
        this.router.navigate([`/admin-home-page/user`]);
      }
    }
  }

  submit(): void {
    this.fillOutForm();
    console.log(this.detailForm.value);

    if (this.detailForm.valid && this.addressForm.valid) {
      this.userService.updateUser(this.user, this.id).subscribe(
        (response) => {
          this.updateAddress(this.userAddressId);
          this.formFilled = true;
          localStorage.removeItem('lockedItem');
          this.unlockItem(this.id);
          this.openSnackBar();
          this.router.navigate(['admin-home-page/user']);
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
    this.user.firstName = this.detailForm.value.firstName;
    this.user.lastName = this.detailForm.value.lastName;
    this.user.gender = this.detailForm.value.gender;
    this.user.dateOfBirth = this.detailForm.value.date;
    this.user.email = this.detailForm.value.email;
    this.user.phone = this.detailForm.value.phone;
    this.user.password = this.detailForm.value.password;
    this.address.country = this.addressForm.value.country;
    this.address.city = this.addressForm.value.city;
    this.address.postcode = this.addressForm.value.postcode;
    this.address.line = this.addressForm.value.line;
  }

  openSnackBar(): void {
    this.snackBar.open('User successfully edited!', 'Close', {
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
    const dialogRef = this.dialog.open(UserEditModalComponent);
   }

   unlockItem(lockedItemId: any): void {
    this.lockService.postUnlockItem(lockedItemId).subscribe();
   }
}
