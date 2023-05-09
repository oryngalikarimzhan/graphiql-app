import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import HashLoader from 'react-spinners/HashLoader';

import './config/i18n';
import App from './App';
import './index.scss';
import { store } from './store/store';
import '../src/config/FirebaseConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<HashLoader color="#a836d6" />}>
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>
  </Suspense>
);
