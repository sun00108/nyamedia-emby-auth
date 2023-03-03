import React, { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Auth from './pages/auth'
import LibraryApp from "./pages/library/app";
import LibraryAppIndex from "./pages/library/index";
import LibraryAppInfo from "./pages/library/info";

function App() {
  return (
      <Fragment>
        <Router>
          <Routes>
              <Route path={'/'} element={<Auth />} />
              <Route path={'/library'} element={<LibraryApp />}>
                  <Route path={''} element={<LibraryAppIndex />} />
                  <Route path={':libraryId'} element={<LibraryAppInfo />} />
              </Route>
          </Routes>
        </Router>
      </Fragment>
  );
}

export default App;
