import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';

import { LanguageSelector } from './components/language-selector/LanguageSelector';
import NotFound from './pages/notFound/NotFound';
import LoginPage from './pages/loginPage/LoginPage';
import RegisterPage from './pages/registerPage/RegisterPage';
import WelcomePage from './pages/welcomePage/WelcomePage';
import MainPageTest from './pages/mainPageTest/MainPageTest';

const App = () => {
  return (
    <>
      <LanguageSelector />
      <Routes>
        <Route index path="/" element={<MainPageTest />} />
        <Route index path="/main" element={<MainPageTest />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
