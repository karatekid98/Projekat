import { AfterViewInit, Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { InvoiceAddComponent } from './invoice-table/invoice-add/invoice-add.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, AfterViewInit {

  clicked = false;
  str: string;
  public text: string;

  constructor(@Inject(AdminHomePageComponent) private parent: AdminHomePageComponent,
              private router: Router, private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeComponent();
    }, 0);

  }

  initializeComponent(): void {
    this.parent.viewContainer.clear();
    let comp = 'invoice';
    let component = 'InvoiceTableComponent';
    if (this.router.url === `/admin-home-page/${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(InvoiceTableComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === `/admin-home-page/${comp}/add-${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(InvoiceAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else {
      if (window.location.href.indexOf(`/admin-home-page/${comp}/edit-${comp}`) > -1) {
        const componentFactory = this.resolver.resolveComponentFactory(InvoiceEditComponent);
        this.parent.viewContainer.createComponent(componentFactory);
      }
    }
  }
}
