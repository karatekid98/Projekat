
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageModule } from './features/login-page/login-page.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/modules/CoreModule';
import { HomePageModule } from './features/home-page/home-page.module';
import { AdminHomePageModule,  } from './features/admin-home-page/admin-home-page.module';
import { UserModule } from './features/user/user.module';
import { SettingsComponent } from './features/settings-page/settings.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AddressModule } from './features/address/address.module';
import { CustomerModule } from './features/customer/customer.module';
import { ProductModule } from './features/product/product.module';
import { InvoiceModule } from './features/invoice/invoice.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './core/services/translation/translation.service';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    DashboardComponent,
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
    UserModule,
    AddressModule,
    CustomerModule,
    ProductModule,
    InvoiceModule,
    TranslateModule.forRoot(
      {
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }
    ),
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
