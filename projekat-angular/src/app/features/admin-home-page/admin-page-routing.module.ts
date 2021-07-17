import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { UserComponent } from '../user/user.component';
import { CustomerComponent } from '../customer/customer.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ProductComponent } from '../product/product.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { UserProfileEditComponent } from '../user-profile/user-profile-edit/user-profile-edit.component';
import { UserEditComponent } from '../user/user-edit/user-edit.component';
import { UserAddComponent } from '../user/user-table/user-add/user-add.component';
import { UserTableComponent } from '../user/user-table/user-table.component';
import { AddressRoutingModule } from '../address/address-routing.module';


const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'address', component: AddressComponent },
  { path: 'user', component: UserComponent,  },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'product', component: ProductComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'user-profile-edit', component: UserProfileEditComponent},
  //  {path: 'user', component: UserComponent, children: [
  // //   { path: '', component: UserTableComponent },
  // //   { path: 'add-user', component: UserAddComponent },
  //  { path: 'edit-user/:id', component: UserEditComponent },
  //  ]},
  { path: 'user', component: UserComponent,
  loadChildren: () => import('../user/user-routing.module').then(m => m.UserRoutingModule)},
  { path: 'address', component: AddressComponent,
  loadChildren: () => import('../address/address-routing.module').then(m => m.AddressRoutingModule)},
  { path: 'customer', component: CustomerComponent,
  loadChildren: () => import('../customer/customer-routing.module').then(m => m.CustomerRoutingModule)},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
