import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { UserAddComponent } from './user-table/user-add/user-add.component';
import { UserComponent } from './user.component';
import { UserTableComponent } from './user-table/user-table.component';

const routes: Routes = [
  {path: '', component: UserComponent, children: [
      { path: '', component: UserTableComponent },
      { path: 'add-user', component: UserAddComponent },
      { path: 'edit-user/:id', component: UserEditComponent },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class UserRoutingModule { }
