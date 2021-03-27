import { LoginPageComponent } from './features/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { AuthGuard } from './core/services/auth-gard-service/auth-gard';
import { UserComponent } from './features/user/user.component';
import { AddressComponent } from './features/address/address.component';
import { AdminHomePageComponent } from './features/admin-home-page/admin-home-page.component';
import { InvoiceComponent } from './features/invoice/invoice.component';
import { ProductComponent } from './features/product/product.component';
import { CustomerComponent } from './features/customer/customer.component';
import { UserAddComponent } from './features/user/user-table/user-add/user-add.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { UserEditComponent } from './features/user/user-edit/user-edit.component';
import { AdminHomePageModule } from './features/admin-home-page/admin-home-page.module';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'admin-home-page',
  loadChildren: () => import('../app/features/admin-home-page/admin-home-page.module').then(m => m.AdminHomePageModule)},

  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
