import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

// Componente Sidebar per la navigazione
const Sidebar: React.FC = () => {
  const location = useLocation();

  // Elementi del menu
  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/novita', label: 'Novità', icon: '✨' },
    { path: '/radio', label: 'Radio', icon: '📻' },
  ];

  const exploreItems = [
    { path: '/esplora-generi', label: 'Esplora per genere', icon: '🎵' },
    { path: '/worldwide', label: 'Worldwide', icon: '🌍' },
    { path: '/video-musicali', label: 'Video musicali', icon: '🎬' },
    { path: '/nuovi-artisti', label: 'Nuovi artisti', icon: '🎤' },
    { path: '/classifiche', label: 'Classifiche', icon: '📊' },
    { path: '/audio-spaziale', label: 'Audio spaziale', icon: '🎧' },
    { path: '/hit-del-passato', label: 'Hit del passato', icon: '⏮️' },
  ];

  return (
    <div className="sidebar">
      {/* Logo Apple Music */}
      <div className="sidebar-header">
        <div className="apple-music-logo">
          <span className="music-icon">🎵</span>
          <span className="music-text">Music</span>
        </div>
      </div>

      {/* Menu principale */}
      <Nav className="flex-column sidebar-nav">
        {menuItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link 
              as={Link} 
              to={item.path}
              className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      {/* Sezione "Altro da esplorare" */}
      <div className="sidebar-section">
        <h6 className="sidebar-section-title">Altro da esplorare</h6>
        <Nav className="flex-column">
          {exploreItems.map((item) => (
            <Nav.Item key={item.path}>
              <Nav.Link 
                as={Link} 
                to={item.path}
                className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;