import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGetPaymentMethods } from './paymethodAPI';

const initialState = {
    value: [],
    status: 'idle',
  };
  
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

  export const selectPaymentMethod = (state) => state.paymentMethod.value;
  
  export const selectPaymentMethodStatus = (state) => state.paymentMethod.status;
  
  export default paymentMethodSlice.reducer;