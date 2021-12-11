import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { billGet, billRegister, updateStatusBill } from './billAPI';

const initialState = {
  value: [],
  status: 'idle',
  registered: null,
};

export const getbillAsync = createAsyncThunk(
  'bill/billGet',
  async (jwt) => {
    const response = await billGet(jwt);
    return response;
  }
);

export const registerBillAsync = createAsyncThunk(
  'bill/billRegister',
  async (bill) => {

    const response = await billRegister(bill);
    return response;
  }
);

export const updateStatusBillAsync = createAsyncThunk(
  'bill/updateStatusBill',
  async (bill) => {
    const response = await updateStatusBill(bill);
    return response;
  }
);

export const billSlice = createSlice({
  name: 'bill',
  initialState,
  reducers: {
    setValues: (state) =>{
      state.registered = null;
    } 
  },
  extraReducers: (builder) => {
    builder
      .addCase(getbillAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getbillAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if (!action.payload.error) {
          state.value = action.payload;
        }
      })
      
      .addCase(updateStatusBillAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStatusBillAsync.fulfilled, (state, action) => {

        state.status = 'idle';
        for (let i = 0; i < state.value.length; i++) {

          if (state.value[i].id == action.payload.id){

            state.value[i] = action.payload

          }
        }

      })

      .addCase(registerBillAsync.pending, (state) => {
        state.status = 'loading';
      })
        .addCase(registerBillAsync.rejected, (state) => {
            state.status = 'idle';
        })
        .addCase(registerBillAsync.fulfilled, (state, action) => {
            
            state.status = 'idle';

            if (action.payload.error) {
              state.registered = false;
            }else{
              state.registered = true;
            }
      })
  },
});

export const { setValues } = billSlice.actions;

export const selectBill = (state) => state.bill.value;

export const selectBillRegistered = (state) => state.bill.registered;

export const selectBillStatus = (state) => state.bill.status;

export default billSlice.reducer;

