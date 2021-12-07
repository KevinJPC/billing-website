import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice';
import paymethodReducer from '../features/payment-methods/paymethodSlice';
import billReducer from '../features/bill/billSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    paymethod: paymethodReducer,
    bill: billReducer,
  },
});
