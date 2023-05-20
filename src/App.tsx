import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import 'normalize.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './pages/notFound/NotFound';
import { LoginPageLazy } from './pages/loginPage/LoginPageLazy';
import { WelcomePageLazy } from './pages/welcomePage/WelcomePageLazy';
import { MainPageLazy } from './pages/mainPage/MainPageLazy';
import { RegistrationPageLazy } from './pages/registerPage/RegistrationPageLazy';

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
