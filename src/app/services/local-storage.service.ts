import { BehaviorSubject, Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  isUserLoggedIn: Subject<boolean> = new Subject<boolean>();

  constructor() {}

  set(key: string, value: any) {
    localStorage.setItem(key, value);
  }
  get(key: string) {
    return localStorage.getItem(key);
  }

  login() {
    if (localStorage.getItem('token')) {
      localStorage.setItem("isLogin","true");
      this.isUserLoggedIn.next(true);
    }

  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
  
  logout() {
    this.isUserLoggedIn.next(false);
    localStorage.setItem("isLogin","false");
  }
}
