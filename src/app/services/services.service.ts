import { AppStoreState } from '../store/app.state';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { setServicesModel } from '../store/customerToRegister/customer.actions';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private controllerUrl = `${environment.apiUrl}/services`;

  serviceModel$:Observable<Service | null>;

  constructor(private httpClient: HttpClient,private store: Store<AppStoreState>) {
    this.serviceModel$ = this.store.select(
      (state) => state.customer.serviceModel
    );
  }

  getServices(): Observable<Service[]> {
    //get metodu Get Http istediğini hazırlıyor.
    return this.httpClient.get<Service[]>(this.controllerUrl);
  }

  add(service: Service): Observable<Service> {
    return this.httpClient.post<Service>(this.controllerUrl, service);
  }

  update(service: Service): Observable<Service> {
    return this.httpClient.put<Service>(
      `${this.controllerUrl}/${service.id}`,
      service
    );
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.controllerUrl}/${id}`);
  }

  saveServices(services: Service) {
    this.store.dispatch(setServicesModel( {services}));
  }
}
