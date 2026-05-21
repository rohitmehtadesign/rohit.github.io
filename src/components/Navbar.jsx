import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ colorMode, toggleColorMode }) {
  const location = useLocation();

  const links = [
    { name: 'Work', path: '#work' },
    { name: 'Contact', path: '#contact' },
  ];

  return (
    <nav className="navbar container">
      <div className="nav-brand">
        <a href="#" className="brand-logo">rohit.</a>
      </div>
      
      <div className="nav-links">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.path}
            className="nav-link"
          >
            {link.name}
          </a>
        ))}
        <button className="theme-toggle" onClick={toggleColorMode} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {colorMode === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          <span>{colorMode === 'dark' ? 'Dark' : 'Light'}</span>
        </button>
      </div>
    </nav>
  );
}
