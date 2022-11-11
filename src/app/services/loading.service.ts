import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  pendingRequestCount: number = 0;

  constructor() {}

  startLoading(){
    this.pendingRequestCount++;
    this.isLoadingSubject.next(true);
  }

  stopLoading(){
    this.pendingRequestCount--;
    this.isLoadingSubject.next(false);
  }
}
