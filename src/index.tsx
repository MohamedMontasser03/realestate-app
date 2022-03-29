import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { GridProvider } from './context/GridContext';
import { SelectedProvider } from './context/SelectedContext';

ReactDOM.render(
  <React.StrictMode>
    <SelectedProvider>
    <GridProvider>
    <App />
    </GridProvider>
    </SelectedProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
