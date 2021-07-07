import { AfterViewInit, Component, ComponentFactoryResolver, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { TemplateRef } from '@angular/core';
import { CustomerComponent } from '../customer/customer.component';
import { UserComponent } from '../user/user.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ProductComponent } from '../product/product.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.scss'],
})
export class AdminHomePageComponent implements OnInit, AfterViewInit {
  @ViewChild('viewContainer', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  @ViewChild('isLoggedInTemplate', { read: TemplateRef }) template: TemplateRef<any>;

  row = '';
  showFiller = false;


  constructor(private router: Router, private resolver: ComponentFactoryResolver) {}

  ngOnInit(): void {
    if (window.location.href.indexOf("user") !== -1){
      console.log('tu sam');

    }

  }

  ngAfterViewInit(): void {
    const componentFactory = this.resolver.resolveComponentFactory(AddressComponent);
    this.viewContainer.createComponent(componentFactory);
  }

  openComponent(event): void {
    this.viewContainer.clear();

    if (event.target.id === '') {
      this.getClickedRow(event.target.parentElement.id);

    } else {
      this.getClickedRow(event.target.id);
    }



    let clickedComponent = this.row;
    clickedComponent = this.row + 'Component';
    if (clickedComponent === 'CustomerComponent') {
      const componentFactory = this.resolver.resolveComponentFactory(CustomerComponent);
      this.viewContainer.createComponent(componentFactory);
    } else if (clickedComponent === 'UserComponent') {
      const componentFactory = this.resolver.resolveComponentFactory(UserComponent);
      this.viewContainer.createComponent(componentFactory);
    } else if (clickedComponent === 'ProductComponent') {
      const componentFactory = this.resolver.resolveComponentFactory(ProductComponent);
      this.viewContainer.createComponent(componentFactory);
    } else if (clickedComponent === 'InvoiceComponent') {
      const componentFactory = this.resolver.resolveComponentFactory(InvoiceComponent);
      this.viewContainer.createComponent(componentFactory);
    } else if (clickedComponent === 'UserProfileComponent') {
      const componentFactory = this.resolver.resolveComponentFactory(UserProfileComponent);
      this.viewContainer.createComponent(componentFactory);
    } else if (clickedComponent === 'UserProfileEditComponent') {
      const componentFactory = this.resolver.resolveComponentFactory(UserProfileComponent);
      this.viewContainer.createComponent(componentFactory);
    }else {
      const componentFactory = this.resolver.resolveComponentFactory(AddressComponent);
      this.viewContainer.createComponent(componentFactory);
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
