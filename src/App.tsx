import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';

import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import NotFound from './pages/notFound/NotFound';
import { Playground } from './components/playground/Playground';

const App = () => {
  return (
    <>
      <Header />
      <Playground />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};
export default App;
