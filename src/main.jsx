import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './assets/css/resets.css'
import './assets/css/main.css'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { ToastContainer, toast } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <ToastContainer position="top-left"/>
    </PersistGate>
  </Provider>,
)
