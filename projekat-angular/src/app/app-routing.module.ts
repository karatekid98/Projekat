import { LoginPageComponent } from './features/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { AdminHomePageComponent } from './features//admin-home-page/admin-home-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'home-page/:id', component: HomePageComponent },
  { path: 'admin-home-page/:id', component: AdminHomePageComponent},
  { path: 'login-page', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
