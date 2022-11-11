import { authReducer } from './auth/auth.reducer';
import { customerReducer } from './customerToRegister/customer.reducer';

export const appReducers = {
  auth: authReducer,
  customer: customerReducer,
  // customerToRegister: customerToRegisterReducer,
};
