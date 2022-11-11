import { RouterModule, Routes } from '@angular/router';

import { CatalogListComponent } from './pages/catalog-list/catalog-list.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { CreateServicesComponent } from './pages/create-services/create-services.component';
import { CreationOverviewComponent } from './pages/creation-overview/creation-overview.component';
import { CustomerDetailComponent } from './pages/customer-detail/customer-detail.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {path: "", pathMatch: 'full', redirectTo : 'home'},
  {path: "home", component : HomeComponent,canActivate:[LoginGuard] },
  {path: "login", component : LoginComponent },
  {
    path: "customers",
    component : CustomersComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'customer-detail/:id',
    component: CustomerDetailComponent,
    canActivate:[LoginGuard]
  },
  {
    path: 'create-customer',
    component: CreateCustomerComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'create-services',
    component: CreateServicesComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'creation-overview',
    component: CreationOverviewComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'catalog-list',
    component: CatalogListComponent,
    canActivate: [LoginGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
