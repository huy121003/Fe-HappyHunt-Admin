import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  isAuthenticated: false,
  isLoading: true,
  account: {
    fullName: '',
    phoneNumber: '',
    avatar: '',
    role: {
      _id: '',
      name: '',
    },
    _id: '',
  },
};

export const SAuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginaction: (state, action) => {
      state.isAuthenticated = true;
      state.account = action.payload;
      state.isLoading = false;
    },
    getUserAction: (state, action) => {
      state.isAuthenticated = true;
      state.account = action.payload;
      state.isLoading = false;
    },
    logoutAction: (state) => {
      localStorage.removeItem('access_token');
      state.isAuthenticated = false;
      state.account = {
        fullName: '',
        phoneNumber: '',
        avatar: '',
        role: {
          _id: '',
          name: '',
        },
        _id: '',
      };
    },
  },
});
export const { loginaction, getUserAction, logoutAction } = SAuthSlice.actions;
export default SAuthSlice.reducer;
