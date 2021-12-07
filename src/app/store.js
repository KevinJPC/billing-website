import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import productReducer from '../features/product/productSlice';
import paymethodReducer from '../features/payment-methods/paymethodSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    paymethod: paymethodReducer,
  },
});
