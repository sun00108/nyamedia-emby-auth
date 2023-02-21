import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './pages/auth'

function App() {
  return (
      <Fragment>
        <Router>
          <Routes>
            <Route path={'/'} element={<Auth />} />
          </Routes>
        </Router>
      </Fragment>
  );
}

export default App;
