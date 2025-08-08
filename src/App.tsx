import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import Sidebar from "./components/Sidebar";
import MusicPlayer from "./components/MusicPlayer";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
  
          <div className="sidebar-col">
            <Sidebar />
          </div>

  
          <div className="main-content-col">
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/novita"
                  element={
                    <div className="page-placeholder">Novità - In sviluppo</div>
                  }
                />
                <Route
                  path="/radio"
                  element={
                    <div className="page-placeholder">Radio - In sviluppo</div>
                  }
                />
                <Route
                  path="/esplora-generi"
                  element={
                    <div className="page-placeholder">
                      Esplora per genere - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="/worldwide"
                  element={
                    <div className="page-placeholder">
                      Worldwide - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="/video-musicali"
                  element={
                    <div className="page-placeholder">
                      Video musicali - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="/nuovi-artisti"
                  element={
                    <div className="page-placeholder">
                      Nuovi artisti - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="/classifiche"
                  element={
                    <div className="page-placeholder">
                      Classifiche - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="/audio-spaziale"
                  element={
                    <div className="page-placeholder">
                      Audio spaziale - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="/hit-del-passato"
                  element={
                    <div className="page-placeholder">
                      Hit del passato - In sviluppo
                    </div>
                  }
                />
                <Route
                  path="*"
                  element={
                    <div className="page-placeholder">Pagina non trovata</div>
                  }
                />
              </Routes>

    
              <Footer />
            </div>
          </div>

    
          <MusicPlayer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
