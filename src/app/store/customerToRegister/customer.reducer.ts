import { CustomerStoreState, initialCustomerStoreState } from './customer.state';
import { createReducer, on } from '@ngrx/store';
import { setCatalogsModel, setCreateCorporateCustomerModel, setCreateIndividualCustomerModel, setServicesModel } from './customer.actions';

export const customerReducer = createReducer<CustomerStoreState>(
  initialCustomerStoreState,
  on(
    setCreateIndividualCustomerModel, // yakalamak istediğim action
    (currentState, action) => {
      return {
        ...currentState,
        individualCustomerModel: action.createIndividualCustomer,
      };
    }
  ),
  on(
    setCreateCorporateCustomerModel, // yakalamak istediğim action
    (currentState, action) => {
      return {
        ...currentState,
        corporateCustomerModel: action.createCorporateCustomer,
      };
    }
  ),
  on(
    setServicesModel, // yakalamak istediğim action
    (currentState, action) => {
      return {
        ...currentState,
        serviceModel: action.services,
      };
    }
  ),
  on(
    setCatalogsModel, // yakalamak istediğim action
    (currentState, action) => {
      return {
        ...currentState,
        catalogModel: action.catalogs,
      };
    }
  )
);
