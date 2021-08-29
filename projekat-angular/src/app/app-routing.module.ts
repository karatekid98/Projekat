
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './features/home-page/home-page.component';
import { AdminHomePageComponent } from './features/admin-home-page/admin-home-page.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { LoginPageComponent } from './features/login-page/login-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/login-page', pathMatch: 'full' },
  { path: 'login-page', component: LoginPageComponent },
  { path: 'home-page', component: HomePageComponent },
  { path: 'admin-home-page', component: AdminHomePageComponent,
  loadChildren: () => import('../app/features/admin-home-page/admin-home-page.module').then(m => m.AdminHomePageModule)},

  { path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
