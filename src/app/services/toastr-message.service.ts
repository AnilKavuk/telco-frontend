import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrMessageService {

  constructor(private toastr:ToastrService) { }

  success(text:string){
    this.toastr.success(text);
  }
  error(title:string,message:string){
    this.toastr.error(title,message);
  }
  info(title:string,message:string){
    this.toastr.info(title,message);
  }
}
