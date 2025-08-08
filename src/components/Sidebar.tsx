import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Track } from "../store/favoritesSlice";
import "./Sidebar.css";
// Importa l'icona SVG come URL dalla cartella logos
import musicIconUrl from "../assets/logos/music.svg";

// Componente Sidebar per la navigazione
const Sidebar: React.FC = () => {
  const location = useLocation();
  const [searchResults, setSearchResults] = useState<Track[]>([]);

  // Elementi del menu
  const menuItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/novita", label: "Novità", icon: "✨" },
    { path: "/radio", label: "Radio", icon: "📻" },
  ];

  // Gestisce i risultati della ricerca
  const handleSearchResults = (results: Track[]) => {
    setSearchResults(results);
    // Qui potresti implementare la logica per comunicare i risultati alle pagine
    console.log("Risultati ricerca dalla sidebar:", results);
  };

  return (
    <div className="sidebar">
      {/* Logo Apple Music */}
      <div className="sidebar-header">
        <div className="apple-music-logo">
          <img src={musicIconUrl} alt="Music" className="music-icon" />
        </div>

        {/* Barra di ricerca */}
        <div className="sidebar-search">
          <SearchBar
            onSearchResults={handleSearchResults}
            placeholder="Cerca"
          />
        </div>
      </div>

      {/* Menu principale */}
      <Nav className="flex-column sidebar-nav">
        {menuItems.map((item) => (
          <Nav.Item key={item.path}>
            <Nav.Link
              as={Link}
              to={item.path}
              className={`sidebar-link ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.label}</span>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
