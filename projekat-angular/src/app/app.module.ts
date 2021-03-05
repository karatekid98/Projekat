
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './features/login-page/login-page.module';
import { SharedModule } from './shared/shared.module';
import { RegistrationPageComponent } from './features/registration-page/registration-page.component';
import { CoreModule } from './core/modules/CoreModule';
import { HomePageModule } from './features/home-page/home-page.module';
import { AdminHomePageModule,  } from './features/admin-home-page/admin-home-page.module';
import { UserModule } from './features/user/user.module';
import { InvoiceComponent } from './features/invoice/invoice.component';
import { ProductComponent } from './features/product/product.component';
import { CustomerComponent } from './features/customer/customer.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationPageComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    LoginPageModule,
    BrowserAnimationsModule,
    CoreModule,
    HomePageModule,
    AdminHomePageModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
