import { LoadingDataInterceptor } from './../services/loading-spinner-service/loading-data.interceptor';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../services/auth-gard-service/auth-gard';
import { TranslationService } from '../services/translation.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingDataInterceptor,
    multi: true,
  }, AuthGuard, TranslationService
],
})
export class CoreModule {
}
