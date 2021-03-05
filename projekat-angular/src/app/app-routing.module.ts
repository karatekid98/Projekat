import { UserModule } from './features/user/user.module';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { AuthGuard } from './core/services/auth-gard-service/auth-gard';
import { UserComponent } from './features/user/user.component';
import { UserTableComponent } from './features/user/user-table/user-table.component';
import { AddressComponent } from './features/address/address.component';
import { AdminHomePageComponent } from './features/admin-home-page/admin-home-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'admin-home-page', component: AdminHomePageComponent},
  // { path: 'user',
  // loadChildren: () => import('../app/features/user/user.module').then(m => m.UserModule)},
  {
    path: 'admin-home-page', component: AdminHomePageComponent, children: [
      { path: '', component: AddressComponent },
      { path: 'address', component: AddressComponent },
      { path: 'user', component: UserComponent },

    ]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
