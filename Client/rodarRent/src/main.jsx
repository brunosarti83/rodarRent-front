import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import 'aos/dist/aos.css'; // Importa los estilos CSS de AOS
import AOS from 'aos';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Importa redux-thunk para manejar acciones asíncronas
import rootReducer from './redux/rootReducer'; // Importa tu rootReducer

AOS.init();

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
