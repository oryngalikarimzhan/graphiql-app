import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import './configs/i18n';
import './configs/FirebaseConfig';
import { store } from './store/store';
import App from './App';
import { SpinnerLoader } from './components/spinner-loader/SpinnerLoader';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Suspense fallback={<SpinnerLoader />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
