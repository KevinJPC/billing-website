import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGetPaymentMethods } from './paymethodAPI';

const initialState = {
    value: [],
    status: 'idle',
  };

  //asynchronous functions to get payment methods and filter them 
  export const getPaymentMethodAsync = createAsyncThunk(
    'paymentMethods/fetchGet',
    async () => {
      const response = await fetchGetPaymentMethods();
      return response;
    }
  );
  
  export const paymentMethodSlice = createSlice({
    name: 'paymentMethod',
    initialState,

    reducers: {
    },

    extraReducers: (builder) => {
      builder
      // respective functions depending on the state of the asynchronous function

      // getPaymentMethodAsync
        .addCase(getPaymentMethodAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getPaymentMethodAsync.fulfilled, (state, action) => {
          state.status = 'idle';

          if (!action.payload.error) {
            state.value = action.payload;
          }

        });
    },
  });
  
  export const { } = paymentMethodSlice.actions;


 //this helps to select de payment and the state 
  export const selectPaymentMethod = (state) => state.paymentMethod.value;
  
  export const selectPaymentMethodStatus = (state) => state.paymentMethod.status;
  
  export default paymentMethodSlice.reducer;