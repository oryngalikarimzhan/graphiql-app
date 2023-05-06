import React from 'react';
import { Route, Routes } from 'react-router-dom';
import 'normalize.css';

import { LanguageSelector } from './components/language-selector/LanguageSelector';
import NotFound from './pages/notFound/NotFound';
import { Playground } from './components/playground/Playground';

const App = () => {
  return (
    <>
      <LanguageSelector />
      <Playground />
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
