import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'normalize.css';

import { LanguageSelector } from './components/language-selector/LanguageSelector';
import NotFound from './pages/notFound/NotFound';
import LoginPage from './pages/loginPage/LoginPage';
import WelcomePage from './pages/welcomePage/WelcomePage';
import MainPageTest from './pages/mainPageTest/MainPageTest';
import RegistrationPage from './pages/registerPage/RegistrationPage';

const App = () => {
  return (
    <>
      <LanguageSelector />
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route index path="/main" element={<MainPageTest />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
