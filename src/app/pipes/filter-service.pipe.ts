import { Pipe, PipeTransform } from '@angular/core';
import { of } from 'rxjs';
import { IndividualCustomers } from '../models/individualCustomers';

@Pipe({
  name: 'filterService'
})
export class FilterServicePipe implements PipeTransform {

  transform(value: IndividualCustomers[],key:string,name:string = ''):any {

    if(!name) return value; //name değerini kontrol etmediğimizde hata almadığımız halde müşteri datasını göremiyorduk

    switch(key){
      case "name":
          return value.filter((customer) => customer.firstName.toLocaleLowerCase().includes(name.toLowerCase()));
          break;
      case "id":
        return value.filter((customer) => customer.nationalIdentity.toString().includes(name));
        break;
      case "birthDay":
        return value.filter((customer: IndividualCustomers) => {
          const [year, month, day] = customer.dateOfBirth.split('-');
          console.log(day);

          let date = new Date(+year, +month - 1, +day);
          console.log("date: ",date);
          console.log("name: ",name);

          return (
            date > new Date(name)
          );
        });
        break;
      default:
         alert("not working");
         break;
  }

  }

}


