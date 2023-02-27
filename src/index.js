import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StarWarsProvider from './context/StarWarsProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StarWarsProvider>
    <App />
  </StarWarsProvider>,
);
