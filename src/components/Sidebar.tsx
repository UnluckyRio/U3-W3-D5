import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import type { Track } from "../store/favoritesSlice";
import "./Sidebar.css";

import musicIconUrl from "../assets/logos/music.svg";


const Sidebar: React.FC = () => {
  const location = useLocation();



  const menuItems = [
    { path: "/", label: "Home", icon: "🏠" },
    { path: "/novita", label: "Novità", icon: "✨" },
    { path: "/radio", label: "Radio", icon: "📻" },
  ];


  const handleSearchResults = (results: Track[]) => {
    console.log('Search results:', results);

    console.log("Risultati ricerca dalla sidebar:", results);
  };

  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <div className="apple-music-logo">
          <img src={musicIconUrl} alt="Music" className="music-icon" />
        </div>

  
        <div className="sidebar-search">
          <SearchBar
            onSearchResults={handleSearchResults}
            placeholder="Cerca"
          />
        </div>
      </div>


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
