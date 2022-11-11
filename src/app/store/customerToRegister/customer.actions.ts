import { createAction, props } from '@ngrx/store';

import { Catalog } from 'src/app/models/catalog';
import { CorporateCustomers } from 'src/app/models/corporateCustomers';
import { IndividualCustomers } from 'src/app/models/individualCustomers';
import { Service } from 'src/app/models/service';

export const setCreateIndividualCustomerModel = createAction(
  '[Customer] Set Create Individual Customer', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ createIndividualCustomer: IndividualCustomers }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const setCreateCorporateCustomerModel = createAction(
  '[Customer] Set Create Corporate Customer', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ createCorporateCustomer: CorporateCustomers }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const setServicesModel = createAction(
  '[Customer] Set Services Customer', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ services: Service }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);

export const setCatalogsModel = createAction(
  '[Customer] Set Catalogs For Selected Customer', //* Benzersiz key verdik. Bu action type/id olucak.
  props<{ catalogs: Catalog }>() //* inline bir interface yazdık.
  //* Bu interface'in içindeki property'ler, action'ın içindeki property'ler/payload olucak.
);
