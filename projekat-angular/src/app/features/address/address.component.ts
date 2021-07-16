import { AfterViewInit } from '@angular/core';
import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { UserAddComponent } from '../user/user-table/user-add/user-add.component';
import { UserTableComponent } from '../user/user-table/user-table.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AddressAddComponent } from './address-table/address-add/address-add.component';
import { AddressTableComponent } from './address-table/address-table.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, AfterViewInit {
  clicked = false;
  str: string;
  private wasInside = false;
  public text: string;

  constructor(@Inject(AdminHomePageComponent) private parent: AdminHomePageComponent,
              private route: ActivatedRoute,
              private router: Router, private resolver: ComponentFactoryResolver) { }

  // TODO: fix complete routing in app
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeComponent();
    }, 0);

  }

  initializeComponent(): void {
    this.parent.viewContainer.clear();
    let comp = 'address';
    let component = 'AddressTableComponent';
    if (this.router.url === `/admin-home-page/${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(AddressTableComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === `/admin-home-page/${comp}/add-${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(AddressAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else {
      if (window.location.href.indexOf(`/admin-home-page/${comp}/edit-${comp}`) > -1) {
        const componentFactory = this.resolver.resolveComponentFactory(AddressEditComponent);
        this.parent.viewContainer.createComponent(componentFactory);
      }
    }
  }

}
