import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { RouterModule, Routes } from '@angular/router';
import {PortalModule} from '@angular/cdk/portal';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageNotFoundComponent } from '../features/page-not-found/page-not-found.component';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { TranslateLabelsPipe } from './translate-labels.pipe';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TranslationService } from '../core/services/translation/translation.service';



@NgModule({
  declarations: [PageNotFoundComponent, TranslateLabelsPipe],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatExpansionModule,
    RouterModule,
    PortalModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTableModule,
    MatExpansionModule,
    RouterModule,
    PortalModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    MatSelectModule,
    MatMenuModule,
    TranslateLabelsPipe,
    TranslateModule
  ],
  providers: [],
})
export class SharedModule { }
