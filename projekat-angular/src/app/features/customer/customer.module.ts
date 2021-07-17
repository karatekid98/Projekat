import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomerRoutingModule } from './customer-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/modules/CoreModule';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerService } from '../../core/services/customer-service/customer.service';
import { CustomerComponent } from './customer.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomerAddComponent } from './customer-table/customer-add/customer-add.component';
import { UserModule } from '../user/user.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [CustomerComponent, CustomerTableComponent, CustomerEditComponent, CustomerAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    CustomerRoutingModule,
    TranslateModule,
    UserModule
  ],
  exports: [CustomerComponent, CustomerTableComponent, CustomerAddComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
