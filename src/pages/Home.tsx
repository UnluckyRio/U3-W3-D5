import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import MusicCard from "../components/MusicCard";
import { Track } from "../store/favoritesSlice";
import { DeezerApiService } from "../services/deezerApi";
import chillImage from "../assets/images/1a.png";
import musicaUnoImage from "../assets/images/1b.png";
import "./Home.css";

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

        // Carica brani di artisti diversi e casuali
        const diverseArtists = [
          "adele",
          "bruno mars",
          "billie eilish",
          "the weeknd",
          "dua lipa",
          "coldplay",
          "imagine dragons",
          "maroon 5",
          "rihanna",
          "justin bieber",
          "ariana grande",
          "post malone",
          "drake",
          "eminem",
          "beyonce",
          "lady gaga",
          "sam smith",
          "john legend",
        ];

        // Seleziona 6 artisti casuali dalla lista
        const shuffledArtists = diverseArtists.sort(() => 0.5 - Math.random());
        const popularArtists = shuffledArtists.slice(0, 6);
        const promises = popularArtists.map((artist) =>
          DeezerApiService.searchTracks(artist)
        );

        const results = await Promise.all(promises);
        const allTracks = results.flat();

        // Prendi i primi 12 brani unici
        const uniqueTracks = allTracks
          .filter(
            (track, index, self) =>
              index === self.findIndex((t) => t.id === track.id)
          )
          .slice(0, 12);

        setFeaturedTracks(uniqueTracks);
      } catch (error) {
        console.error("Errore nel caricamento dei brani in evidenza:", error);
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
          </Col>
        </Row>

        {/* Risultati della ricerca */}
        {searchResults.length > 0 && (
          <Row className="search-results-section">
            <Col>
              <h2 className="section-title">Risultati della ricerca</h2>
              <Row>
                {searchResults.slice(0, 12).map((track) => (
                  <MusicCard key={track.id} track={track} size="medium" />
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
                  <Card.Body style={{ padding: 0, height: "100%" }}>
                    <img
                      src={chillImage}
                      alt="Chill"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={6} className="mb-4">
                <Card className="featured-card musica-uno-card">
                  <Card.Body style={{ padding: 0, height: "100%" }}>
                    <img
                      src={musicaUnoImage}
                      alt="MUSICA UNO"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "16px",
                      }}
                    />
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
                      <Col
                        key={track.id}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        className="mb-4"
                      >
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
                      <Col
                        key={track.id}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        className="mb-4"
                      >
                        <MusicCard track={track} size="medium" />
                      </Col>
                    ))
                  )}
                </Row>
              </Col>
            </Row>

            {/* Altro da esplorare */}
            <Row className="explore-section">
              <Col>
                <h2 className="section-title">Altro da esplorare</h2>
                <div className="explore-grid">
                  <div className="explore-item">
                    <span className="explore-text">Esplora per genere</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Worldwide</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Video musicali</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Decenni</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Classifiche</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Nuovi artisti</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">
                      Attività e stati d'animo
                    </span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Audio spaziale</span>
                    <span className="chevron-right">›</span>
                  </div>
                  <div className="explore-item">
                    <span className="explore-text">Hit del passato</span>
                    <span className="chevron-right">›</span>
                  </div>
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
};

export default Home;
