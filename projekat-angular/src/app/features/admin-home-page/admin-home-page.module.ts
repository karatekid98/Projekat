import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomePageComponent } from './admin-home-page.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [AdminHomePageComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class AdminHomePageModule { }
