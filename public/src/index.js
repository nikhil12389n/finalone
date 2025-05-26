import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";


import { ConnectionProvider } from './Connection/Connection.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
    <ConnectionProvider>
      
        <App />
      
    </ConnectionProvider>
  // </React.StrictMode>
);
