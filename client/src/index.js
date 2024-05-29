import React, { createContext } from 'react';
import UserStore from './store/UserStore';
import { createRoot } from 'react-dom/client';
import App from './App';
import DeviceStore from './store/DeviceStore';

export const Context = createContext(null)

console.log(process.env.REACT_APP_API_URL)

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    device: new DeviceStore(),
  }}>
    <App />
    
  </Context.Provider>,
  
);
