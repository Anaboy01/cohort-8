import { useState } from 'react';
// TEACHING POINT: useSelector is how we READ data. useDispatch is how we SEND actions.
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './features/counter/counterSlice';

export default function App() {
  // TEACHING POINT: Connecting to the store. 
  // We use useSelector to grab exactly the piece of state we want (state.counter.value).
  const count = useSelector((state) => state.counter.value);
  
  // TEACHING POINT: Setup the dispatcher. This is our messenger pigeon to the store!
  const dispatch = useDispatch();

  // Local state just for the input box (controlled input)
  const [amount, setAmount] = useState(2);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Redux Counter</h1>

        {/* Display the global count */}
        <div className="text-6xl font-black text-blue-600 mb-8">
          {count}
        </div>

        {/* Basic Increment / Decrement Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold w-12 h-12 rounded-full text-2xl transition-colors shadow-md"
            onClick={() => dispatch(decrement())}
          >
            -
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold w-12 h-12 rounded-full text-2xl transition-colors shadow-md"
            onClick={() => dispatch(increment())}
          >
            +
          </button>
        </div>

        {/* Increment by custom amount */}
        <div className="flex items-center gap-2 border-t pt-6">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-20 p-2 border-2 border-gray-200 rounded-lg text-center font-semibold focus:outline-none focus:border-blue-500"
          />
          <button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-2.5 rounded-lg transition-colors shadow-md"
            // TEACHING POINT: Passing a payload! Whatever number we put inside the action
            // becomes 'action.payload' inside our reducer!
            onClick={() => dispatch(incrementByAmount(amount))}
          >
            Add Amount
          </button>
        </div>

      </div>
    </div>
  );
}