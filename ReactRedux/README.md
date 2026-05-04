 # React Redux Counter Lesson

This lesson covers how to manage global state in React using Redux Toolkit. 

If you've ever dealt with "prop drilling" (passing data down through 5 different components just so one button can use it), Redux is the solution. It creates a global "store" that any component can connect to directly.

## What we are building
We are building a simple Counter App. It will have buttons to increment, decrement, and increment by a custom amount so you can learn how actions, reducers, and payloads work.

## Getting Started

1. **Install the dependencies:**
   Make sure you are in this folder and run:
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

## Key Concepts to Learn

* **Store:** The global database for your app.
* **Provider:** The wrapper that gives your app access to the store.
* **Slice:** A piece of the global state (like our counter).
* **useSelector:** The hook used to read data from the store.
* **useDispatch:** The hook used to send actions (like clicking the + button) to update the store.

Check the `src/app/store.js` and `src/features/counter/counterSlice.js` files to see how the logic is separated from the UI!
