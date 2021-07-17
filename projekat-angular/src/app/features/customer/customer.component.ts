import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerAddComponent } from './customer-table/customer-add/customer-add.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit, AfterViewInit {
  clicked = false;
  str: string;
  public text: string;

  constructor(
    @Inject(AdminHomePageComponent) private parent: AdminHomePageComponent,
    private router: Router,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeComponent();
    }, 0);
  }

  initializeComponent(): void {
    this.parent.viewContainer.clear();
    let comp = 'customer';
    let component = 'CustomerTableComponent';
    if (this.router.url === `/admin-home-page/${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(CustomerTableComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === `/admin-home-page/${comp}/add-${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(CustomerAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else {
      if (window.location.href.indexOf(`/admin-home-page/${comp}/edit-${comp}`) > -1) {
        const componentFactory = this.resolver.resolveComponentFactory(CustomerEditComponent);
        this.parent.viewContainer.createComponent(componentFactory);
      }
    }
  }
}
