import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

function App() {
  const [colorMode, setColorMode] = useState('dark');

  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode') || 'dark';
    setColorMode(savedMode);
    document.documentElement.setAttribute('data-theme', savedMode);
  }, []);

  const toggleColorMode = () => {
    const newMode = colorMode === 'dark' ? 'light' : 'dark';
    setColorMode(newMode);
    localStorage.setItem('colorMode', newMode);
    document.documentElement.setAttribute('data-theme', newMode);
  };

  return (
    <Router>
      {/* <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
