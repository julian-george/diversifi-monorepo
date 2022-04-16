import React from "react";
import styles from "./styles.module.scss";
import SpotifyAuth from "./SpotifyAuth";
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Globe from './Globe';

const App: React.FC = () => {
  return (
    <div>
        <Router>
          <div id="post-block">
            <Routes>
              <Route path="/" element={<Globe />} />
              <Route path="/home" element={<SpotifyAuth />} />
            </Routes>
          </div>
        </Router>
    </div>
  );
};
export default App;
