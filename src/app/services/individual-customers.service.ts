import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { IndividualCustomers } from '../models/individualCustomers';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setCreateIndividualCustomerModel } from '../store/customerToRegister/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class IndividualCustomersService  {

  private controllerUrl = `${environment.apiUrl}/individualCustomers`;

  individualCustomerModel$:Observable<IndividualCustomers | null>;

  constructor(private httpClient: HttpClient, private store: Store<AppStoreState>) {

    this.individualCustomerModel$ = this.store.select( //Store'dan individualCustomerModel'ı alıyoruz
      (state) => state.customer.individualCustomerModel
    );
  }

  saveIndividualCustomer(createIndividualCustomer: IndividualCustomers) {
    this.store.dispatch(setCreateIndividualCustomerModel( {createIndividualCustomer}));
  }



  createCustomer(individualCustomer: IndividualCustomers) {
    return this.httpClient.post<IndividualCustomers>(this.controllerUrl, individualCustomer);
  }

  getAllCustomers(): Observable<IndividualCustomers[]> {
    return this.httpClient.get<IndividualCustomers[]>(this.controllerUrl);
  }

  getCustomerDetail(id:number){
    return this.httpClient.get<IndividualCustomers[]>(`${this.controllerUrl}?customerId=${id}`);
  }


}
