import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLogin, fetchReLogin } from './userAPI';

const initialState = {
  value: {},
  status: 'idle',
  error: '',
  connected: null
};

export const loginAsync = createAsyncThunk(
  'user/fetchLogin',
  async (credentials) => {
    const response = await fetchLogin(credentials);
    return response;
  }
);

export const reLoginAsync = createAsyncThunk(
  'user/fetchReLogin',
  async (credentials) => {
    const response = await fetchReLogin(credentials);
    return response;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.value = {};
      state.status = 'idle';
      state.error = '';
      state.connected = false
      sessionStorage.removeItem('jwt');
    }
  },
  extraReducers: (builder) => {
    builder
      ////////////////////////////////////////////////////////////////
      //loginAsync
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginAsync.fulfilled, (state, action) => {

        state.status = 'idle';

        if (action.payload.user) {
          state.connected = true
          state.value = action.payload.user;
          sessionStorage.setItem('jwt', action.payload.jwt);
          state.error = ''
        } else {
          state.connected = false
          state.error = 'Usuario y/o contraseña incorrectos'
        }
      })
      ////////////////////////////////////////////////////////////////
      //loginAsync
      .addCase(reLoginAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reLoginAsync.fulfilled, (state, action) => {

        state.status = 'idle';

        if (action.payload.error) {
          state.connected = false
        } else {
          state.connected = true
          state.value = action.payload;
          let jwt = sessionStorage.getItem('jwt');
          sessionStorage.setItem('jwt', jwt);
        }

      })
  },
});

export const { logOut } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export const selectUserStatus = (state) => state.user.status;

export const selectUserError = (state) => state.user.error;

export const selectUserConnected = (state) => state.user.connected;

export default userSlice.reducer;
