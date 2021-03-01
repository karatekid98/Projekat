import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingDataInterceptor } from 'src/app/core/services/loading-spinner-service/loading-data.interceptor';
import { CoreModule } from '../../core/modules/CoreModule';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    CoreModule,
    SharedModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingDataInterceptor,
    multi: true,
  }]
})
export class HomePageModule { }
