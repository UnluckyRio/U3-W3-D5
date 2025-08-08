import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import MusicPlayer from './components/MusicPlayer';
import Home from './pages/Home';
import Novita from './pages/Novita';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Componente principale dell'applicazione
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Row className="g-0 h-100">
            {/* Sidebar */}
            <Col xs={12} md={3} lg={2} className="sidebar-col">
              <Sidebar />
            </Col>
            
            {/* Contenuto principale */}
            <Col xs={12} md={9} lg={10} className="main-content-col">
              <div className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/novita" element={<Novita />} />
                  <Route path="/radio" element={<div className="page-placeholder">Radio - In sviluppo</div>} />
                  <Route path="/esplora-generi" element={<div className="page-placeholder">Esplora per genere - In sviluppo</div>} />
                  <Route path="/worldwide" element={<div className="page-placeholder">Worldwide - In sviluppo</div>} />
                  <Route path="/video-musicali" element={<div className="page-placeholder">Video musicali - In sviluppo</div>} />
                  <Route path="/nuovi-artisti" element={<div className="page-placeholder">Nuovi artisti - In sviluppo</div>} />
                  <Route path="/classifiche" element={<div className="page-placeholder">Classifiche - In sviluppo</div>} />
                  <Route path="/audio-spaziale" element={<div className="page-placeholder">Audio spaziale - In sviluppo</div>} />
                  <Route path="/hit-del-passato" element={<div className="page-placeholder">Hit del passato - In sviluppo</div>} />
                  <Route path="*" element={<div className="page-placeholder">Pagina non trovata</div>} />
                </Routes>
              </div>
            </Col>
          </Row>
          
          {/* Player musicale fisso */}
          <MusicPlayer />
        </div>
      </Router>
    </Provider>
  );
}

export default App
