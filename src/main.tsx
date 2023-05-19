import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './configs/i18n';
import App from './App';
import './index.scss';
import { store } from './store/store';
import './configs/FirebaseConfig';
import { SpinnerLoader } from './components/spinner-loader/SpinnerLoader';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<SpinnerLoader />}>
    <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </React.StrictMode>
  </Suspense>
);
