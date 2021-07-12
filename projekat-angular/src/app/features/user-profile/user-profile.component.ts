import { AfterContentInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../core/services/user-service/user.service';
import { Address } from '../../models/address';
import { Invoice } from 'src/app/models/invoice';
import { ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterContentInit   {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  user: User;
  invoices: Array<Invoice> = [];
  address: Address;
  printed = false;

  constructor(private userService: UserService, private router: Router, private resolver: ComponentFactoryResolver) { }

  // TODO: fix NG0100 expression error
  ngOnInit(): void {
    this.getUser();
    this.getUserAddress();
    this.getUserInvoices();
  }

  ngAfterContentInit(): void {

    // TODO: change scroll

  }
  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('userObject'));
  }

  getUserAddress(): void {
    this.userService.getUserAddress(this.user.addressId).subscribe(
      (response) => {
        this.address = response;
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

  checkIfInvoiceIsPrinted(): void {
    this.invoices.forEach(element => {
      if (element) {

      } else {

      }
    });
  }

  // openComponent(event): void {
  //   this.viewContainer.clear();

  //   const componentFactory = this.resolver.resolveComponentFactory(UserProfileEditComponent);
  //   this.viewContainer.createComponent(componentFactory);
  // }
}
