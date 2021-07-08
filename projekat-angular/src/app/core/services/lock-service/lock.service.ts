import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LockItem } from '../../../models/lockItem';

@Injectable({
  providedIn: 'root'
})
export class LockService {

  constructor(private http: HttpClient) { }

  getIsItemLocked(itemId: any): Observable<boolean>  {
    return this.http.get<boolean>(`http://localhost:28846/api/Lock/isItemLocked/${itemId}`);
  }

  postLockItem(lockedItem: LockItem): Observable<LockItem>  {
    return this.http.post<LockItem>(`http://localhost:28846/api/Lock/lockItem`, lockedItem);
  }

  postUnlockItem(itemId: any): Observable<boolean>  {
    return this.http.post<boolean>(`http://localhost:28846/api/Lock/unlockItem/${itemId}`, itemId);
  }
}
