import { AuthStoreState } from './auth/auth.state';
import { CustomerStoreState } from './customerToRegister/customer.state';

export interface AppStoreState {
  auth: AuthStoreState;
  customer: CustomerStoreState;
  // customerToRegister: CustomerToRegister;
}
