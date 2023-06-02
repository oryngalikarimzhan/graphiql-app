import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';
import 'components/auth/firebaseConfig';
import 'components/localization/i18n';

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
