import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product-service/product.service';
import { ProductComponent } from './product.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductRoutingModule } from './product-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/modules/CoreModule';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user/user.module';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductAddComponent } from './product-table/product-add/product-add.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [ProductComponent, ProductTableComponent, ProductEditComponent, ProductAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    ProductRoutingModule,
    TranslateModule,
    UserModule
  ],
  exports: [ProductComponent, ProductTableComponent, ProductAddComponent],
  providers: [ProductService]
})
export class ProductModule { }
