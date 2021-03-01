
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './features/login-page/login-page.component';
import { HomePageComponent } from './features/home-page/home-page.component';
import { LoginPageModule } from './features/login-page/login-page.module';
import { SharedModule } from './shared/shared.module';
import { RegistrationPageComponent } from './features/registration-page/registration-page.component';
import { CoreModule } from './core/modules/CoreModule';
import { AdminHomePageComponent } from './features/admin-home-page/admin-home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
    AdminHomePageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    LoginPageModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
