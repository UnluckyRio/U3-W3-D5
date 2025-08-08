import React, { useState, useCallback } from "react";
import { Form, InputGroup, Button, Spinner } from "react-bootstrap";
import { DeezerApiService } from "../services/deezerApi";
import type { Track } from "../store/favoritesSlice";
import "./SearchBar.css";


interface SearchBarProps {
  onSearchResults: (results: Track[]) => void;
  placeholder?: string;
}


const SearchBar: React.FC<SearchBarProps> = ({
  onSearchResults,
  placeholder = "Cerca brani, artisti, album...",
}) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const handleSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        onSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const results = await DeezerApiService.searchTracks(searchQuery);
        onSearchResults(results);
      } catch (err) {
        setError("Errore durante la ricerca. Riprova.");
        console.error("Errore ricerca:", err);
        onSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [onSearchResults]
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);


    const timeoutId = setTimeout(() => {
      handleSearch(newQuery);
    }, 500);


    return () => clearTimeout(timeoutId);
  };


  const handleClear = () => {
    setQuery("");
    setError(null);
    onSearchResults([]);
  };

  return (
    <div className="search-bar-container">
      <Form onSubmit={handleSubmit}>
        <InputGroup className="search-input-group">
          <InputGroup.Text className="search-icon">🔍</InputGroup.Text>

          <Form.Control
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            className="search-input"
            disabled={isLoading}
          />

          {query && (
            <Button
              variant="outline-secondary"
              onClick={handleClear}
              className="clear-button"
              disabled={isLoading}
            >
              ✕
            </Button>
          )}

          <Button
            variant="primary"
            type="submit"
            disabled={isLoading || !query.trim()}
            className="search-button"
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : "Cerca"}
          </Button>
        </InputGroup>
      </Form>

      {error && <div className="search-error">{error}</div>}

      {isLoading && (
        <div className="search-loading">
          <Spinner animation="border" size="sm" className="me-2" />
          Ricerca in corso...
        </div>
      )}
    </div>
  );
};

export default SearchBar;
