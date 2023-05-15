import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import 'normalize.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './pages/notFound/NotFound';
import LoginPage from './pages/loginPage/LoginPage';
import WelcomePage from './pages/welcomePage/WelcomePage';
import MainPage from './pages/mainPage/MainPage';
import RegistrationPage from './pages/registerPage/RegistrationPage';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route index path="/main" element={<MainPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
