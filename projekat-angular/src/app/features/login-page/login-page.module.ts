import { LoadingSpinnerService } from './../../core/services/loading-spinner-service/loading-spinner.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../../core/modules/CoreModule';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingDataInterceptor } from 'src/app/core/services/loading-spinner-service/loading-data.interceptor';
import { LoginPageComponent } from './login-page.component';
import { SharedModule } from '../../shared/shared.module';

import { LoginService } from '../../core/services/login-service/login.service';



@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingDataInterceptor,
    multi: true,
  }, LoadingSpinnerService, LoginService
  ],
  exports: [LoginPageComponent]
})
export class LoginPageModule { }
