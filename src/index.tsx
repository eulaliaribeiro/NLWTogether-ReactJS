import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './services/firebase'

// DOM = Document Object Model

ReactDOM.render(
  // método render: renderizar/exibir um elemento dentro de um HTML
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// HTML dentro do JS => JSX, aqui no caso é TSX