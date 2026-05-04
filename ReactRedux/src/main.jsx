import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// REDUX IMPORTS
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* TEACHING POINT: The Provider is like a massive WiFi router. 
        We wrap our entire App in it and plug in the 'store'. 
        Now, ANY component inside our app can connect to the Redux WiFi! */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
