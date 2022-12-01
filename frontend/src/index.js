import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/App.css';
import './styles/styleMedia.css';
import './styles/itemlist.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { CartsContextProvider } from './component/contexts/CartContext';
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL_PROD;
} else if (process.env.NODE_ENV === 'test') {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL_TEST;
} else {
  axios.defaults.baseURL = process.env.REACT_APP_API_URL_DEV;
}
ReactDOM.createRoot(document.getElementById('root')).render(
  <CartsContextProvider>
    <App />
  </CartsContextProvider>
);
