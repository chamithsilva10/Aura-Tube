import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>
    </Router>
  );
};

export default App;