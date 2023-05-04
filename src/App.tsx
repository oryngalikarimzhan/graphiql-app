import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';
import 'normalize.css';
import Header from './components/header/Header';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
