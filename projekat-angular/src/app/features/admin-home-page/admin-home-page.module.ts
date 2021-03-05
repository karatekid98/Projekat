import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './admin-home-page.component';
import { SharedModule } from '../../shared/shared.module';
import { UserModule } from '../user/user.module';
import { UserComponent } from '../user/user.component';
import { AddressComponent } from '../address/address.component';


@NgModule({
  declarations: [AdminHomePageComponent, AddressComponent],
  imports: [
    CommonModule,
    SharedModule,
    UserModule
  ],
  entryComponents: [ UserComponent, AddressComponent],
})
export class AdminHomePageModule { }
