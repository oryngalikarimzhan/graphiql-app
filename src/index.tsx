import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.scss';
import './features/localization/i18n';
import './features/auth/firebaseConfig';
import { store } from './store/store';
import App from './App';
import { LoaderSection } from 'components/common/section-loader-wrapper/LoaderSection';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <Suspense fallback={<LoaderSection className="loader-screen" />}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Suspense>
);
