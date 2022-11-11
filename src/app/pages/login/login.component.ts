import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthLoginService } from 'src/app/services/auth-login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';
import { User } from 'src/app/models/user';
import { LoginDto } from 'src/app/models/loginDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  data!: LoginDto;
  errorMessage!: string;
  constructor(
    private authLoginService: AuthLoginService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toasterService:ToastrMessageService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  login() {
    if(!this.loginForm.valid){
      this.toasterService.error('Form alanı zorunludur', 'Sistem mesajı :')
    }else{
      const userLogin: User = {
        ...this.loginForm.value,
      };
      this.authLoginService.login(userLogin).subscribe({
        next: (res) => {
          this.authLoginService.saveToken(res);
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.toasterService.error('Kulanıcı bulunamadı','Sistem mesajı');
        },
        complete: () => {
          this.router.navigateByUrl('/home');
          this.authLoginService.emitOnLoginEvent(
            `Hoşgeldiniz, ${this.loginForm.value.userName}`
          );
        },
      });
    }
  }

}
