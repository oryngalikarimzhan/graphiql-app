import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';
import 'normalize.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
