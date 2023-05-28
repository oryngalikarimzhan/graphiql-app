import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';
import 'features/localization/i18n';
import 'features/auth/firebaseConfig';

ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
