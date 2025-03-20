import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import MBTIQuiz from './pages/MBTIQuiz';
import EnneagramQuiz from './pages/EnneagramQuiz';
import Result from './pages/Result';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mbti" element={<MBTIQuiz />} />
          <Route path="/enneagram" element={<EnneagramQuiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App; 