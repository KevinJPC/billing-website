import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGetProducts, fetchGetProductsByQuery } from './productAPI';

const initialState = {
  value: [],
  status: 'idle',
};

//asynchronous functions to get products and filter them
export const getProductsAsync = createAsyncThunk(
  'product/fetchGetProducts',
  async () => {
    const response = await fetchGetProducts();
    return response;


  }
);

export const getProductsByQueryAsync = createAsyncThunk(
  'product/fetchGetProductsByQuery',
  async (query) => {
    const response = await fetchGetProductsByQuery(query);
    return response;
  }
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    removeProducts: (state) => {
      state.value = []
      state.status = 'idle'
    }
  },

  extraReducers: (builder) => {
    builder
      //respective functions depending on the state of the asynchronous function 

      //getProductsAsync
      .addCase(getProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      
        if (action.payload.error) {
        }else{
          state.value = action.payload;
        }
        
      })
      
      //getProductsByQueryAsync
      .addCase(getProductsByQueryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProductsByQueryAsync.fulfilled, (state, action) => {
        state.status = 'idle';

        if(action.payload.error){
        }else{
          state.value = action.payload;
        }

      });
  },
});

export const { removeProducts } = productSlice.actions;

export const selectProduct = (state) => state.product.value;

export const selectProductStatus = (state) => state.product.status;

export default productSlice.reducer;
