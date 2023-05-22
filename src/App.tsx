import React, { lazy, Suspense } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'normalize.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './pages/notFound/NotFound';
import { SpinnerLoader } from './components/spinner-loader/SpinnerLoader';

const MainPageLazy = lazy(() => import('./pages/mainPage/MainPage'));
const WelcomePageLazy = lazy(() => import('./pages/welcomePage/WelcomePage'));
const LoginPageLazy = lazy(() => import('./pages/loginPage/LoginPage'));
const RegistrationPageLazy = lazy(() => import('./pages/registerPage/RegistrationPage'));

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Suspense fallback={<SpinnerLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />
          <Route index path="/main" element={<MainPageLazy />} />
          <Route path="/welcome" element={<WelcomePageLazy />} />
          <Route path="/login" element={<LoginPageLazy />} />
          <Route path="/registration" element={<RegistrationPageLazy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {pathname !== '/main' && <Footer />}
    </>
  );
};
export default App;
