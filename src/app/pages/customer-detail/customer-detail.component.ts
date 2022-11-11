import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Catalog } from 'src/app/models/catalog';
import { CatalogService } from 'src/app/services/catalog.service';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { CorporateCustomersService } from 'src/app/services/corporate-customers.service';
import { Customer } from 'src/app/models/customer';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { IndividualCustomersService } from 'src/app/services/individual-customers.service';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  individualCustomer!:IndividualCustomers[];
  corporateCustomer!:CorporateCustomers[];
  customerId!:number;
  subscription!:Subscription[];
  service!:Service[];
  catalog!:Catalog[];
  catalogId!:number[];
  serviceId!:number[];
  filteredService!:Service[];
  filteredCatalog!:Catalog[];
  lengthOfIndividual:number = 0;
  lengthOfCorporate:number = 0;

  constructor(
    private individualCustomerService:IndividualCustomersService,
    private corporateCustomerService:CorporateCustomersService,
    private route:ActivatedRoute,
    private subscriptionsService:SubscriptionsService,
    private catalogService:CatalogService,
    private servicesService:ServicesService
    ) { }

  ngOnInit(): void {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.getSubscriptions();
    this.getCustomer();
  }
  getCustomer(){
    this.individualCustomerService.getCustomerDetail(this.customerId).subscribe((res)=> {
      this.individualCustomer = res;
      this.lengthOfIndividual = this.individualCustomer.length;
    });
    this.corporateCustomerService.getCustomerDetail(this.customerId).subscribe((res) =>
    {
      this.corporateCustomer = res;
      this.lengthOfCorporate = this.corporateCustomer.length;
    });
}

  getSubscriptions(){
    this.subscriptionsService.getSubscription(this.customerId).subscribe({
      next: (res) => {
        this.subscription = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
          this.getServices();
          this.getCatalogs();
      },
    });
  }
  getServices(){
    this.servicesService.getServices().subscribe({
      next: (res) => {
        this.service = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.serviceId = this.subscription.map(sub => sub.serviceId);
        console.log(this.serviceId);

        this.filteredService = this.service.filter(item => this.serviceId.includes(item.id));
        console.log(this.filteredService);
      },
    });
  }

  getCatalogs(){
    this.catalogService.getCatalog().subscribe({
      next: (res) => {
        this.catalog = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.catalogId = this.subscription.map(sub => sub.serviceId);
        console.log(this.serviceId);

        this.filteredCatalog = this.catalog.filter(item => this.serviceId.includes(item.serviceId));
        console.log(this.filteredService);
      },
    });
  }


}
