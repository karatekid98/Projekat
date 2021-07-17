import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '../user/user.component';
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/modules/CoreModule';
import { UserTableComponent } from './user-table/user-table.component';
import { UserService } from '../../core/services/user-service/user.service';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { UserAddComponent } from './user-table/user-add/user-add.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { RouterModule } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { EditModalComponent } from '../../shared/edit-modal/edit-modal.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [UserComponent, UserTableComponent, DeleteModalComponent, UserAddComponent, UserEditComponent, EditModalComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    UserRoutingModule,
    TranslateModule,
  ],
  exports: [UserComponent, UserTableComponent, UserAddComponent],
  providers: [UserService]
})
export class UserModule { }
