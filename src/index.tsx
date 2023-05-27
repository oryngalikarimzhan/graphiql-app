import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import { LoaderSection } from 'components/common/section-loader/LoaderSection';
import App from './App';
import 'features/localization/i18n';
import 'features/auth/firebaseConfig';
import { store } from 'store/store';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Suspense fallback={<LoaderSection className="loader-screen" />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
