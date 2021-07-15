import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../core/services/translation.service';

@Pipe({
  name: 'translateLabels'
})
export class TranslateLabelsPipe implements PipeTransform {

  constructor(private getTranslation: TranslationService){

  }
  transform(value: string, ...args: any): any {
    return this.getTranslation.getJSONfile(value);
  }


}
