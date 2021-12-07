import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice';
import userReducer from '../features/user/userSlice';
import paymentMethodReducer from '../features/paymentMethod/paymethodSlice';
import billReducer from '../features/bill/billSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    user: userReducer,
    paymentMethod: paymentMethodReducer,
    bill: billReducer,
  },
});
