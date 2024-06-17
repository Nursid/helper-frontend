import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StateMangerProvider } from './Context/StateManageContext';
import { Provider } from 'react-redux';
import store from './Store/Store';
import { RolesProvider } from './Context/RolesContext';
import { AuthProvider, useAuthProvider } from './Context/userAuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RolesProvider>
        <AuthProvider>
          <StateMangerProvider>
            <App />
          </StateMangerProvider>
        </AuthProvider>
      </RolesProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
