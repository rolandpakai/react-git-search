import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from "styled-components";
import { Theme } from "./styles/styles";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/Home";
import './App.css';

function App() {
  return (
    <>
    <Router>
      <ThemeProvider theme={Theme}>
        <div className="root">
          <Routes>
            <Route path="/" exact element={<Home />} />
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  </>
  );
}

export default App;