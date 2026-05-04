import { createSlice } from '@reduxjs/toolkit';

// State tracks if they are logged in, and their user details
const initialState = {
  isLoggedIn: false,
  user: null, // will hold { name: '...', password: '...' }
};

export const authSlice = createSlice({
  name: 'auth',
   reducers: {
    // Action to handle login
    login: (state, action) => {
      state.isLoggedIn = true;
      // The payload will be the object containing name and password
      state.user = action.payload;
    },
    // Action to handle logout
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
