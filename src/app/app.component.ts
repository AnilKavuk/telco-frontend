import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'telco-frontend12';

  today: Date = new Date();
  overlayTitleText: string = 'Hoşgeldiniz...';

  constructor() {}


  sumOfNumbers(a: number, b: number) {
    let result = a + b;
    // console.log(result);
    return result;
  }

  btnClick() {
    alert('Butona tıklandı');
  }

}
