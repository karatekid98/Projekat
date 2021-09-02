import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { TranslateService, TranslationChangeEvent } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnInit {
  private jsonURL = '../../../assets/i18n/sr.json';
  private jsonData;
  public response;

  constructor(private translate: TranslateService, private http: HttpClient, ) {
    translate.setDefaultLang('en');
    translate.use('en');
   }

   ngOnInit(): void {}

   public getJSON(): Observable<any> {
    return this.http.get(this.jsonURL);
  }

  public getJSONfile(value: any): any {
    return this.getJSON().pipe(map((res) => {
        for (let key in res) {
          if (key === value) {
            this.response = res[key];
            return this.response;
          }
        }
      })
    );
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
    this.translate.onLangChange.subscribe((event: TranslationChangeEvent) => {
      this.translate.setDefaultLang(event.lang);
    });
  }

}
