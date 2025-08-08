import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import MusicCard from '../components/MusicCard';
import { Track } from '../store/favoritesSlice';
import { DeezerApiService } from '../services/deezerApi';
import './Home.css';

// Componente della homepage
const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [featuredTracks, setFeaturedTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Carica i brani in evidenza all'avvio
  useEffect(() => {
    const loadFeaturedTracks = async () => {
      try {
        setIsLoading(true);
        
        // Carica brani di artisti popolari
        const popularArtists = ['queen', 'the beatles', 'ed sheeran', 'taylor swift'];
        const promises = popularArtists.map(artist => 
          DeezerApiService.searchTracks(artist)
        );
        
        const results = await Promise.all(promises);
        const allTracks = results.flat();
        
        // Prendi i primi 12 brani unici
        const uniqueTracks = allTracks
          .filter((track, index, self) => 
            index === self.findIndex(t => t.id === track.id)
          )
          .slice(0, 12);
        
        setFeaturedTracks(uniqueTracks);
      } catch (error) {
        console.error('Errore nel caricamento dei brani in evidenza:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeaturedTracks();
  }, []);

  // Gestisce i risultati della ricerca
  const handleSearchResults = (results: Track[]) => {
    setSearchResults(results);
  };

  return (
    <div className="home-page">
      <Container fluid>
        {/* Header con ricerca */}
        <Row className="home-header">
          <Col>
            <div className="welcome-section">
              <h1 className="page-title">Novità</h1>
              <p className="page-subtitle">
                Rilassati, al resto pensiamo noi. Ascolta Apple Music Chill
              </p>
            </div>
            
            <SearchBar 
              onSearchResults={handleSearchResults}
              placeholder="Cerca brani, artisti, album..."
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

        {/* Sezioni principali */}
        {searchResults.length === 0 && (
          <>
            {/* Sezione Chill e Musica Uno */}
            <Row className="featured-sections">
              <Col md={6} className="mb-4">
                <Card className="featured-card chill-card">
                  <Card.Body>
                    <div className="featured-content">
                      <div className="featured-text">
                        <h3>Chill</h3>
                        <p>🎵 Music Radio</p>
                      </div>
                      <div className="featured-image">
                        <div className="chill-avatar">👨‍🎤</div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6} className="mb-4">
                <Card className="featured-card musica-uno-card">
                  <Card.Body>
                    <div className="featured-content">
                      <div className="featured-text">
                        <h3>MUSICA UNO</h3>
                        <p>🎵 Music Radio</p>
                      </div>
                      <div className="featured-image">
                        <div className="musica-uno-avatars">
                          <div className="avatar">👩‍🎤</div>
                          <div className="avatar">👨‍🎤</div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Nuovi episodi radio */}
            <Row className="radio-episodes-section">
              <Col>
                <h2 className="section-title">Nuovi episodi radio</h2>
                <Row>
                  {isLoading ? (
                    <Col className="text-center">
                      <div className="loading-spinner">Caricamento...</div>
                    </Col>
                  ) : (
                    featuredTracks.slice(0, 5).map((track) => (
                      <Col key={track.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                        <MusicCard track={track} size="small" />
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
            </Row>

            {/* Nuove uscite */}
            <Row className="new-releases-section">
              <Col>
                <h2 className="section-title">Nuove uscite</h2>
                <Row>
                  {isLoading ? (
                    <Col className="text-center">
                      <div className="loading-spinner">Caricamento...</div>
                    </Col>
                  ) : (
                    featuredTracks.slice(5, 12).map((track) => (
                      <Col key={track.id} xs={6} sm={4} md={3} lg={2} className="mb-4">
                        <MusicCard track={track} size="medium" />
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;