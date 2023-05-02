import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound from './pages/notFound/NotFound';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};
export default App;
