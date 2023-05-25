import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import './features/localization/i18n';
import './features/auth/firebaseConfig';
import { store } from './store/store';
import App from './App';
import { SpinnerLoader } from 'components/common/spinner-loader/SpinnerLoader';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Suspense fallback={<SpinnerLoader />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
