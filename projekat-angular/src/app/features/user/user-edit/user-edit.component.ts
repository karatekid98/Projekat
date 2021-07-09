import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { Component, KeyValueDiffers, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { MatDialog } from '@angular/material/dialog';
import { LockService } from 'src/app/core/services/lock-service/lock.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss', '../user-table/user-add/user-add.component.scss']
})
export class UserEditComponent implements OnInit {
  hide = true;
  confirmhide = true;
  formFilled = true;
  public id: any;
  user: User;
  hasChange = false;
  initalValues: any;
  initalValuesAddress: any;
  userAddressId: any;
  pageHeader = 'Edit user';
  isButtonVisible = true;

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
              private router: Router,  public dialog: MatDialog, private lockService: LockService) { }

  ngOnInit(): void {
    if (localStorage.getItem('lockedItem') === null) {
      this.pageHeader = 'Read-only user';
      this.isButtonVisible = false;
      this.detailForm.disable();
      this.addressForm.disable();
    }
    this.id = this.getUrlParams();
    this.userService.getUser(this.id).subscribe((user) => {

      this.userAddressId = user.addressId;
      this.detailForm.patchValue(user);
      this.detailForm.patchValue({
        date: user.dateOfBirth
      });
      this.patchAddressForm();
      this.initalValues = this.detailForm.value;
      this.initalValuesAddress = this.addressForm.value;
    });

  }

  patchAddressForm(): void {
    this.userService.getUserAddress(this.userAddressId).subscribe((address) => {


      this.addressForm.patchValue(address[0]);
    });
  }

  // TODO: dodaj u uslov i promenu na formi adrese
  backToUserTable(): void {
    if (this.initalValues !== this.detailForm.value) {
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
