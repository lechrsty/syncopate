import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { VinylCut } from "./components/VinylCut";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VinylCut />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
