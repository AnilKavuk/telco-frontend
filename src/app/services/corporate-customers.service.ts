import { AppStoreState } from '../store/app.state';
import { CorporateCustomers } from '../models/corporateCustomers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setCreateCorporateCustomerModel, } from '../store/customerToRegister/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class CorporateCustomersService  {

  corporateCustomerModel$:Observable<CorporateCustomers | null>;

  private controllerUrl = `${environment.apiUrl}/corporateCustomers`;

  constructor(private httpClient: HttpClient,private store: Store<AppStoreState>) {
    this.corporateCustomerModel$ = this.store.select(
      (state) => state.customer.corporateCustomerModel
    );
  }

  getAllCustomers(): Observable<CorporateCustomers[]> {
    return this.httpClient.get<CorporateCustomers[]>(this.controllerUrl);
  }
  getCustomerDetail(id:number){
    return this.httpClient.get<CorporateCustomers[]>(`${this.controllerUrl}?customerId=${id}`);
  }

  createCustomer(corporateCustomer: CorporateCustomers): Observable<CorporateCustomers> {
    return this.httpClient.post<CorporateCustomers>(this.controllerUrl, corporateCustomer);
  }

  saveCorporateCustomer(createCorporateCustomer: CorporateCustomers) {
    this.store.dispatch(setCreateCorporateCustomerModel( {createCorporateCustomer}));
  }
}
