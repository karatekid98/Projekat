import { AfterContentInit } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../core/services/user-service/user.service';
import { Address } from '../../models/address';
import { Invoice } from 'src/app/models/invoice';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterContentInit   {
  user: User;
  invoice: Invoice;
  address: Address;
  constructor(private userService: UserService) { }

  // TODO: fix NG0100 expression error
  ngOnInit(): void {
    this.getUser();
    this.getUserAddress();
  }

  // TODO: maybe add user location on google map
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
        console.log(this.address);

      },
      (error) => {
        console.log(error.error);
      });
  }



}
