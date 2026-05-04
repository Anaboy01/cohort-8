import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';

// TEACHING POINT: The 'store' is the global brain of our application.
// We import our slice reducers here and add them to the configureStore object.
// Think of this as the main database where all state lives!
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
