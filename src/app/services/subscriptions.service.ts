import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  private controllerUrl = `${environment.apiUrl}/subscriptions`;

  constructor(private httpClient: HttpClient) {}

  getSubscription(id:number|null){
    return this.httpClient.get<Subscription[]>(`${this.controllerUrl}?customerId=${id}`);
  }

  postSubscription(subscription: Subscription) {
    return this.httpClient.post<Subscription>(this.controllerUrl, subscription);
  }

}
