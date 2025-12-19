import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 👈 BrowserRouter import کریں
import App from './App.jsx'; // جہاں آپ اپنا Home component استعمال کر رہے ہیں۔
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* پوری ایپ کو BrowserRouter میں wrap کریں */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);