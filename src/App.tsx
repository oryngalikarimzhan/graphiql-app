import React, { lazy } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'normalize.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './pages/notFound/NotFound';

const MainPageLazy = lazy(() => import('./pages/mainPage/MainPage'));
const WelcomePageLazy = lazy(() => import('./pages/welcomePage/WelcomePage'));
const LoginPageLazy = lazy(() => import('./pages/loginPage/LoginPage'));
const RegistrationPageLazy = lazy(() => import('./pages/registerPage/RegistrationPage'));

const App = () => {
  const { pathname } = useLocation();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route index path="/main" element={<MainPageLazy />} />
        <Route path="/welcome" element={<WelcomePageLazy />} />
        <Route path="/login" element={<LoginPageLazy />} />
        <Route path="/registration" element={<RegistrationPageLazy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {pathname !== '/main' && <Footer />}
    </>
  );
};
export default App;
