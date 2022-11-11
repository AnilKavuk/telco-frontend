import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { AuthLoginService } from '../services/auth-login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private localStorage: LocalStorageService,private autService:AuthLoginService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.autService.isAuthenticated) {
      const modifiedReq = request.clone({
        setHeaders: { Authorization: `Bearer ${this.autService.jwtToken}` },
      });
      // console.log('if çalıştı');
      // console.log(JSON.stringify(modifiedReq.headers));
      return next.handle(modifiedReq);
    } else {
      // console.log('else çalıştı');
      // console.log(JSON.stringify(request.headers));
      return next.handle(request);
    }
  }
}
