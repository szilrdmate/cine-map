import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import store from './utils/store.js';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render with React.StrictMode in development, but not in production
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'development') {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}
