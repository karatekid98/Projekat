import { Customer } from 'src/app/models/customer';
import { AdminHomePageComponent } from './../admin-home-page/admin-home-page.component';
import { AfterContentInit, ViewChild, ComponentFactoryResolver, AfterViewInit, Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../core/services/user-service/user.service';
import { Address } from '../../models/address';
import { Invoice } from 'src/app/models/invoice';
import { ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';
import { CustomerService } from '../../core/services/customer-service/customer.service';
import { LockService } from '../../core/services/lock-service/lock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LockItem } from 'src/app/models/lockItem';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit   {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  user: User;
  invoices: Array<Invoice> = [];
  address: Address;
  printed = false;
  customers: Array<Customer> = [];
  lockedItem: LockItem = {
    itemId: '',
    userId: ''
  };

  constructor(@Inject(AdminHomePageComponent) private parent: AdminHomePageComponent,
              private customerService: CustomerService,
              private userService: UserService, private router: Router,
              private snackBar: MatSnackBar,
              private lockService: LockService,
              private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.getUser();
    this.getUserAddress();
    this.getUserInvoices();
    this.getCustomer();
    // this.checkIfInvoiceIsPrinted();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeComponent();
    }, 0);
  }

  initializeComponent(): void {
    this.parent.viewContainer.clear();
  }

  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('userObject'));
  }

  getUserAddress(): void {
    this.userService.getUserAddress(this.user.addressId).subscribe(
      (response) => {
        this.address = response[0];
      },
      (error) => {
        console.log(error.error);
      });
  }

  getUserInvoices(): void {
    this.userService.getUserInvoices(this.user.id).subscribe(
      (response) => {
        this.invoices = response;
      },
      (error) => {
        console.log(error.error);
      });
  }

  // checkIfInvoiceIsPrinted(): void {
  //   this.invoices.forEach(element => {
  //     if (element.isPrinted) {
  //       console.log(element);

  //     } else {

  //     }
  //   });
  // }

  getCustomer(): void {
    this.customerService.getCustomersNoPag().subscribe((customers) => {
      this.customers = customers;
    });
  }

  editUser(): void {
    this.lockService.getIsItemLocked(this.user.id).subscribe((result) => {
      if (result === false) {
            this.router.navigate([`/admin-home-page/user/edit-user/${this.user.id}`]);
            this.lockItem(this.user.id);
      } else {
        this.openSnackBar();
      }
    });
  }

  editInvoice(id: any): void {
    this.lockService.getIsItemLocked(id).subscribe((result) => {
      if (result === false) {
            this.router.navigate([`/admin-home-page/invoice/edit-invoice/${id}`]);
            this.lockItem(id);
        } else {
          this.openSnackBar();
        }
    });
  }

  editAddress(id: any): void {
    this.lockService.getIsItemLocked(id).subscribe((result) => {
      if (result === false) {
            this.router.navigate([`/admin-home-page/address/edit-address/${id}`]);
            this.lockItem(id);
        }else {
          this.openSnackBar();
        }
    });
  }

  lockItem(id: any): void {
    this.lockedItem.itemId = id;
    this.lockService.postLockItem(this.lockedItem).subscribe();
  }

  openSnackBar(): void {
    this.snackBar.open('User is currently being modified! Try again later.', 'Close', {
      duration: 4000,
      panelClass: ['snackbar']
    });
  }

  openComponent(event): void {
    this.viewContainer.clear();

    const componentFactory = this.resolver.resolveComponentFactory(UserProfileEditComponent);
    this.viewContainer.createComponent(componentFactory);
  }
}
