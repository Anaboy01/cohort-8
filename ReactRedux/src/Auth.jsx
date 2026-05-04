import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './features/auth/authSlice';

export default function Auth() {
  const dispatch = useDispatch();
  // Read the auth state from the Redux store
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // Local state just for the input fields
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name || !password) return;
    
    // Dispatch the login action WITH a payload (the user object)
    dispatch(login({ name, password }));
    
    // Clear inputs after login
    setName('');
    setPassword('');
  };

  return (
    <div className="w-full max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Auth Simulation</h2>
      
      {/* Status Display */}
      <div className={`p-3 rounded-lg font-bold mb-6 ${isLoggedIn ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
        Status: {isLoggedIn ? 'Active (Logged In)' : 'Not Active'}
      </div>

      {isLoggedIn ? (
        // What to show when logged in
        <div>
          <p className="mb-4 font-semibold">Welcome back, {user?.name}!</p>
          <button 
            onClick={() => dispatch(logout())}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        // What to show when logged out
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input 
            type="text" 
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded focus:outline-blue-500"
          />
          <input 
            type="password" 
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded focus:outline-blue-500"
          />
          <button 
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition-colors"
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
}
