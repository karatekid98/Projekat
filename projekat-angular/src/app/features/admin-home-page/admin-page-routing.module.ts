import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from '../address/address.component';
import { UserComponent } from '../user/user.component';
import { CustomerComponent } from '../customer/customer.component';
import { InvoiceComponent } from '../invoice/invoice.component';
import { ProductComponent } from '../product/product.component';
import { AdminHomePageComponent } from './admin-home-page.component';
import { SettingsComponent } from '../settings-page/settings.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'address', component: AddressComponent },
  { path: 'user', component: UserComponent,  },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'product', component: ProductComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'user', component: UserComponent,
  loadChildren: () => import('../user/user-routing.module').then(m => m.UserRoutingModule)},
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AdminPageRoutingModule { }
