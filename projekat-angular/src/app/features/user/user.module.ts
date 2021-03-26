import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/modules/CoreModule';
import { UserTableComponent } from './user-table/user-table.component';
import { UserService } from '../../core/services/user-service/user.service';
import { UserDeleteModalComponent } from './user-table/user-delete-modal/user-delete-modal.component';
import { UserAddComponent } from './user-table/user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserComponent, UserTableComponent, UserDeleteModalComponent, UserAddComponent, UserEditComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    UserRoutingModule
  ],
  exports: [UserComponent, UserTableComponent, UserAddComponent],
  providers: [UserService]
})
export class UserModule { }
