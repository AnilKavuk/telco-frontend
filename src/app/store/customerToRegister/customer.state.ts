import { Catalog } from "src/app/models/catalog";
import { CorporateCustomers } from "src/app/models/corporateCustomers";
import { IndividualCustomers } from "src/app/models/individualCustomers";
import { Service } from "src/app/models/service";

export interface CustomerStoreState {
  individualCustomerModel: IndividualCustomers | null;
  corporateCustomerModel: CorporateCustomers | null;
  serviceModel: Service | null;
  catalogModel: Catalog | null;
}

export const initialCustomerStoreState: CustomerStoreState = {
  individualCustomerModel: null,
  corporateCustomerModel: null,
  serviceModel: null,
  catalogModel: null
};
