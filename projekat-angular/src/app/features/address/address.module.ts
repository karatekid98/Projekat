import { AddressRoutingModule } from './address-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule } from 'src/app/core/modules/CoreModule';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressService } from '../../core/services/address-service/address.service';
import { AddressTableComponent } from './address-table/address-table.component';
import { AddressEditComponent } from './address-edit/address-edit.component';
import { AddressAddComponent } from './address-table/address-add/address-add.component';
import { AddressComponent } from './address.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserModule } from '../user/user.module';
import { TranslationService } from 'src/app/core/services/translation/translation.service';





@NgModule({
  declarations: [AddressTableComponent, AddressEditComponent, AddressAddComponent, AddressComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    AddressRoutingModule,
    TranslateModule,
    UserModule
  ],
  exports: [AddressComponent, AddressTableComponent, AddressAddComponent, AddressEditComponent],
  providers: [AddressService, TranslationService]
})
export class AddressModule { }
