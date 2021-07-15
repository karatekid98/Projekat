import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { delay } from 'rxjs/operators';
import { LoadingSpinnerService } from './core/services/loading-spinner-service/loading-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projekat-angular';
  logged = '';
  constructor(private spinnerService: LoadingSpinnerService) {

  }

  showSpinner = this.spinnerService.visibility.pipe(delay(0));

}
