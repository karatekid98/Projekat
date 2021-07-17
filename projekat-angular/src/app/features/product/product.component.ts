import { AfterViewInit, Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminHomePageComponent } from '../admin-home-page/admin-home-page.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-table/product-add/product-add.component';
import { ProductTableComponent } from './product-table/product-table.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, AfterViewInit {

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
    let comp = 'product';
    let component = 'ProductTableComponent';
    if (this.router.url === `/admin-home-page/${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(ProductTableComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else if (this.router.url === `/admin-home-page/${comp}/add-${comp}`) {
      const componentFactory = this.resolver.resolveComponentFactory(ProductAddComponent);
      this.parent.viewContainer.createComponent(componentFactory);
    } else {
      if (window.location.href.indexOf(`/admin-home-page/${comp}/edit-${comp}`) > -1) {
        const componentFactory = this.resolver.resolveComponentFactory(ProductEditComponent);
        this.parent.viewContainer.createComponent(componentFactory);
      }
    }
  }

}
