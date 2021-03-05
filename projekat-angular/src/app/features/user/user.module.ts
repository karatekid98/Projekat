import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/modules/CoreModule';
import { UserTableComponent } from './user-table/user-table.component';
import { UserService } from '../../core/services/user-service/user.service';
import { AdminHomePageModule } from '../admin-home-page/admin-home-page.module';

@NgModule({
  declarations: [UserComponent, UserTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports: [UserComponent, UserTableComponent],
  providers: [UserService]
})
export class UserModule { }
