import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { VinylCut } from "./VinylCut"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <VinylCut />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
