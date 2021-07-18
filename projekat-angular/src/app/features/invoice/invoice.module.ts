import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/modules/CoreModule';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserModule } from '../user/user.module';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './invoice.component';
import { InvoiceTableComponent } from './invoice-table/invoice-table.component';
import { InvoiceAddComponent } from './invoice-table/invoice-add/invoice-add.component';
import { InvoiceService } from '../../core/services/invoice-service/invoice.service';
import { InvoiceEditComponent } from './invoice-edit/invoice-edit.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [InvoiceComponent, InvoiceTableComponent, InvoiceAddComponent, InvoiceEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    InvoiceRoutingModule,
    TranslateModule,
    UserModule
  ],
  exports: [InvoiceComponent, InvoiceTableComponent, InvoiceAddComponent],
  providers: [InvoiceService]
})
export class InvoiceModule { }
