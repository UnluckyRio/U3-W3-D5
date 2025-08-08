import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import MusicCard from '../components/MusicCard';
import SearchBar from '../components/SearchBar';
import { Track } from '../store/favoritesSlice';
import { DeezerApiService } from '../services/deezerApi';
import './Novita.css';

// Componente della pagina Novità
const Novita: React.FC = () => {
  const [newReleases, setNewReleases] = useState<Track[]>([]);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica le nuove uscite all'avvio
  useEffect(() => {
    const loadNewReleases = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Artisti per le nuove uscite
        const newArtists = [
          'billie eilish', 'dua lipa', 'the weeknd', 'ariana grande',
          'post malone', 'olivia rodrigo', 'harry styles', 'doja cat',
          'bad bunny', 'taylor swift', 'drake', 'justin bieber'
        ];
        
        // Carica brani da artisti recenti
        const promises = newArtists.slice(0, 6).map(artist => 
          DeezerApiService.searchTracks(artist)
        );
        
        const results = await Promise.all(promises);
        const allTracks = results.flat();
        
        // Filtra e ordina per unicità
        const uniqueTracks = allTracks
          .filter((track, index, self) => 
            index === self.findIndex(t => t.id === track.id)
          )
          .slice(0, 24); // Mostra più brani per la pagina novità
        
        setNewReleases(uniqueTracks);
      } catch (err) {
        setError('Errore nel caricamento delle novità. Riprova più tardi.');
        console.error('Errore nel caricamento delle novità:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadNewReleases();
  }, []);

  // Gestisce i risultati della ricerca
  const handleSearchResults = (results: Track[]) => {
    setSearchResults(results);
  };

  return (
    <div className="novita-page">
      <Container fluid>
        {/* Header */}
        <Row className="novita-header">
          <Col>
            <div className="page-header">
              <h1 className="page-title">Novità</h1>
              <p className="page-description">
                Scopri le ultime uscite musicali e i brani più recenti dei tuoi artisti preferiti
              </p>
            </div>
            
            <SearchBar 
              onSearchResults={handleSearchResults}
              placeholder="Cerca nelle novità..."
            />
          </Col>
        </Row>

        {/* Risultati della ricerca */}
        {searchResults.length > 0 && (
          <Row className="search-results-section">
            <Col>
              <h2 className="section-title">Risultati della ricerca</h2>
              <Row>
                {searchResults.slice(0, 12).map((track) => (
                  <Col key={track.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                    <MusicCard track={track} size="medium" />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}

        {/* Contenuto principale */}
        {searchResults.length === 0 && (
          <>
            {/* Sezione errore */}
            {error && (
              <Row className="error-section">
                <Col>
                  <div className="error-message">
                    <span className="error-icon">⚠️</span>
                    <p>{error}</p>
                  </div>
                </Col>
              </Row>
            )}

            {/* Sezione loading */}
            {isLoading && (
              <Row className="loading-section">
                <Col className="text-center">
                  <div className="loading-container">
                    <Spinner animation="border" variant="light" />
                    <p className="loading-text">Caricamento delle novità...</p>
                  </div>
                </Col>
              </Row>
            )}

            {/* Nuove uscite */}
            {!isLoading && !error && newReleases.length > 0 && (
              <Row className="new-releases-section">
                <Col>
                  <h2 className="section-title">
                    <span className="title-icon">🆕</span>
                    Nuove uscite
                  </h2>
                  <Row>
                    {newReleases.map((track) => (
                      <Col key={track.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                        <MusicCard track={track} size="medium" />
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            )}

            {/* Messaggio quando non ci sono risultati */}
            {!isLoading && !error && newReleases.length === 0 && (
              <Row className="no-results-section">
                <Col>
                  <div className="no-results-message">
                    <span className="no-results-icon">🎵</span>
                    <h3>Nessuna novità disponibile</h3>
                    <p>Non siamo riusciti a caricare le novità al momento. Riprova più tardi.</p>
                  </div>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Novita;