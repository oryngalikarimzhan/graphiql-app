import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';

import { LanguageSelector } from './components/language-selector/LanguageSelector';
import NotFound from './pages/notFound/NotFound';

const App = () => {
  return (
    <>
      <LanguageSelector />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
