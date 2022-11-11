import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { TokenUserModel } from 'src/app/models/tokenUserModel';
import { AuthLoginService } from 'src/app/services/auth-login.service';
import { Observable } from 'rxjs';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLogin!: boolean;

  @Output() onLogout = new EventEmitter<void>();
  @Output() onLogoutWithValue = new EventEmitter<string>();

  tokenUserModel$: Observable<TokenUserModel | null>;

  constructor(
    private router: Router,
    private authLoginService: AuthLoginService,
    private toastrService:ToastrMessageService
  ) {
    this.tokenUserModel$ = this.authLoginService.tokenUserModel$;
  }

  ngOnInit(): void {
    this.handleOnLogin();
    //* TS tarafında subscribe olunabilir.
    // this.tokenUserModel$.subscribe((tokenUserModel) => {
    //   if (tokenUserModel) this.isLogin = true;
    // });
  }

  logout() {
    this.authLoginService.logout();
    // this.router.navigateByUrl('/login');
    this.isLogin = this.authLoginService.isAuthenticated;
    //* Event'i emit eder/tetikler.
    this.onLogout.emit();
    //* Event'i bir veriyle emit eder/tetikler.
    this.onLogoutWithValue.emit('Hoşçakal, tekrar bekleriz...');

    this.router.navigate(['login']);
  }

  handleOnLogin(): void {
    //* onLogin event'ine (subject) abone olduk, dolayısıyla her tetiklendiğinde ilgili event fonksiyonu çalışır.
    this.authLoginService.onLogin.subscribe({
      next: () => {
        this.isLogin = this.authLoginService.isAuthenticated;
      },
    });
  }
}
