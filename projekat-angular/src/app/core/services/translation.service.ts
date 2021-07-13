import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnInit {
  private jsonURL = '../../../assets/i18n/translation-label.json';
  private jsonData;
  public proba;

  constructor(private translate: TranslateService, private http: HttpClient, ) {
    translate.setDefaultLang('en');
   }

   ngOnInit(): void {}

   public getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

  public getJSONfile(value: any): any {
    return this.getJSON().pipe(map((res) => {
        for (let key in res) {
          if (key === value) {
            this.proba = res[key];
            return this.proba;
          }
        }
      })
    );
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    console.log('language', language);

  }

}
