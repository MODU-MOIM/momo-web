import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
=======
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Router from "./router/Router";
import { GlobalStyle } from './Styles/GlobalStyles.styles';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <GlobalStyle />
        <Router />
      </BrowserRouter>
  </React.StrictMode>
>>>>>>> feature/main
);
