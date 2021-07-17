import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './admin-home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { UserComponent } from '../user/user.component';
import { AddressComponent } from '../address/address.component';
import { ProductComponent } from '../product/product.component';
import { CustomerComponent } from '../customer/customer.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { RouterModule } from '@angular/router';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserProfileEditComponent } from '../user-profile/user-profile-edit/user-profile-edit.component';
import { UserRoutingModule } from '../user/user-routing.module';
import { CoreModule } from '../../core/modules/CoreModule';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { AddressRoutingModule } from '../address/address-routing.module';
import { CustomerRoutingModule } from '../customer/customer-routing.module';


@NgModule({
  declarations: [
    AdminHomePageComponent,
    UserProfileComponent,
    UserProfileEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserModule,
    RouterModule,
    CoreModule,
    AdminPageRoutingModule,
    UserRoutingModule, //proveri, dodato naknadno
    AddressRoutingModule,
    CustomerRoutingModule
  ],
  exports: [
    AdminHomePageComponent
  ],
  providers: [TranslationService],
  entryComponents: [
    UserComponent,
    AddressComponent,
    ProductComponent,
    CustomerComponent,
    InvoiceComponent,
    UserProfileComponent,
    UserProfileEditComponent,
  ],
})
export class AdminHomePageModule { }
