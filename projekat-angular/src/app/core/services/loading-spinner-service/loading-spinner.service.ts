import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  show(): void {
    this.visibility.next(true);
  }

  hide(): void {
    this.visibility.next(false);
  }
}
