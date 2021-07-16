import { LockService } from './../../../core/services/lock-service/lock.service';
import { Address } from './../../../models/address';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddressService } from 'src/app/core/services/address-service/address.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditModalComponent } from '../../../shared/edit-modal/edit-modal.component';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.scss', '../../user/user-table/user-add/user-add.component.scss']
})
export class AddressEditComponent implements OnInit {

  selected = 'Female';
  hide = true;
  confirmhide = true;
  formFilled = true;
  id: any;
  hasChange = false;
  initalValues: any;

  userAddressId: any;
  pageHeader = 'Edit address';
  isButtonVisible = true;


  public address: Address = {
    country: '',
    line: '',
    city: '',
    postcode: '',
    id: ''
  };


  addressForm: FormGroup = new FormGroup({
    postcode: new FormControl(''),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    line: new FormControl('', Validators.required)
  });

  @HostListener('window:popstate', ['$event'])
  onPopState(event): void {
    this.unlockItem(localStorage.getItem('lockedItem'));
    localStorage.removeItem('lockedItem');
  }



  constructor(private route: ActivatedRoute, private addressService: AddressService,
              private router: Router,  public dialog: MatDialog,
              private lockService: LockService, private snackBar: MatSnackBar) { }

  // TODO: ADD LIST OF ITEMS TO LOCAL STORAGE, ADD TIMER FOR EDITING USER
  ngOnInit(): void {
    if (localStorage.getItem('lockedItem') === null) {
      this.pageHeader = 'Read-only address';
      this.isButtonVisible = false;
      this.addressForm.disable();
    }
    this.id = this.getUrlParams();
    this.addressService.getAddress(this.id).subscribe((address) => {

      this.addressForm.patchValue(address);

      this.initalValues = this.addressForm.value;

    });

  }

  backToAddressTable(): void {
    if (this.initalValues !== this.addressForm.value) {
      this.openGoBackModal();
    } else {
      const itemId = localStorage.getItem('lockedItem');
      if (itemId !== null) {
        this.unlockItem(itemId);
        localStorage.removeItem('lockedItem');
        this.router.navigate([`/admin-home-page/address`]);
      } else {
        this.router.navigate([`/admin-home-page/address`]);
      }
    }
  }

  submit(): void {
    this.fillOutForm();
    console.log(this.addressForm.valid);

    if (this.addressForm.valid) {
      this.addressService.updateAddress(this.address, this.id).subscribe(
        (response) => {

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

  fillOutForm(): void {
    this.address.country = this.addressForm.value.country;
    this.address.city = this.addressForm.value.city;
    this.address.line = this.addressForm.value.line;
    this.address.id = this.id;
    this.address.postcode = this.addressForm.value.postcode;
  }

  openSnackBar(): void {
    this.snackBar.open('Address successfully edited!', 'Close', {
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
    const dialogRef = this.dialog.open(EditModalComponent , {data: {component: 'address'}});
   }

   unlockItem(lockedItemId: any): void {
    this.lockService.postUnlockItem(lockedItemId).subscribe();
   }
}
