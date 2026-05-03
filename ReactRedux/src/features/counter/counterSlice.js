import { createSlice } from '@reduxjs/toolkit';

// TEACHING POINT: Initial State is what the counter starts at when the app loads.
const initialState = {
  value: 0,
};

// TEACHING POINT: A 'Slice' is exactly what it sounds like—a slice of the global pie.
// Instead of one massive file for everything, we have a slice just for the counter.
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // TEACHING POINT: Reducers are the specific RULES on how the state can be changed.
  // You cannot change state directly in Redux; you MUST dispatch one of these actions!
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers because 
      // it uses Immer under the hood to automatically return a safe copy.
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // TEACHING POINT: Action payload! This allows us to pass a specific number 
    // from our component into the reducer.
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

// TEACHING POINT: We export the actions so our components can dispatch them.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// TEACHING POINT: We export the reducer so the store can use it in store.js.
export default counterSlice.reducer;
