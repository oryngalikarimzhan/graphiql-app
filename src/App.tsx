import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';

import { supportedLngs } from './config/i18n';
import { LanguageSelector } from './components/language-selector/LanguageSelector';
import NotFound from './pages/notFound/NotFound';

const App = () => {
  return (
    <>
      <LanguageSelector languages={supportedLngs} />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
