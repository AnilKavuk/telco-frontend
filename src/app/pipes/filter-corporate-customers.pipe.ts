import { Pipe, PipeTransform } from '@angular/core';

import { CorporateCustomers } from '../models/corporateCustomers';

@Pipe({
  name: 'filterCorporateCustomers'
})
export class FilterCorporateCustomersPipe implements PipeTransform {

  transform(value: CorporateCustomers[],key:string,name:string = ''):any {
    switch(key){
      case "companyName":
        if(value instanceof Array){
          return value.filter((customer) => customer.companyName.toLocaleLowerCase().includes(name.toLowerCase()));
          break;
        }else{
          return [];
          break;
        }
      case "tax":
        return value.filter((customer) => customer.taxNumber.toString().includes(name));
        break;
      default:
         alert("not working");
         break;
    }
  }
}
