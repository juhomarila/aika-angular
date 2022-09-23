import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  public owned: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public inCart: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}
}
