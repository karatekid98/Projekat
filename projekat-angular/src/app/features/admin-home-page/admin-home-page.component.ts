import { UserTableComponent } from './../user/user-table/user-table.component';
import { AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';

import { TemplateRef } from '@angular/core';

import { UserAddComponent } from '../user/user-table/user-add/user-add.component';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { AddressComponent } from '../address/address.component';
@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit, AfterViewInit {

  row = '';
  showFiller = false;

  DynamicComponent: any;

  constructor(private router: Router, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    if (window.location.href.indexOf('user') !== -1){
      console.log('tu sam');

    }

  }

  ngAfterViewInit(): void {

  }

  assignComponent(component): any {
    console.log('clicked');

    if (component.includes('user')) {
      if (component === 'user-add') {
        this.DynamicComponent = UserAddComponent;
      } else if (component === ('user-edit')) {
        this.DynamicComponent = UserEditComponent;
      } else {
        this.DynamicComponent = UserTableComponent;
      }
    } else if (component.includes('address')) {
      if (component === 'address-add') {
        this.DynamicComponent = UserAddComponent;
      } else if (component === ('address-edit')) {
        this.DynamicComponent = UserEditComponent;
      } else {
        this.DynamicComponent = AddressComponent;
      }
    }
  }

  logOut(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login-page']);
  }


  getClickedRow(id: string): string {
    this.row = id;
    return this.row;
  }


}
