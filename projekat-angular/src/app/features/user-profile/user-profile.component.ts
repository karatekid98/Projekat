import { AfterContentInit } from '@angular/core';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterContentInit   {
  user: User;

  constructor() { }

  // TODO: fix NG0100 expression error
  ngOnInit(): void {
    this.getUser();
  }

  ngAfterContentInit(): void {


  }
  getUser(): void {
    this.user = JSON.parse(localStorage.getItem('userObject'));
  }




}
