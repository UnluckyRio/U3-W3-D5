import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner, Card } from "react-bootstrap";
import MusicCard from "../components/MusicCard";
import { Track } from "../store/favoritesSlice";
import { DeezerApiService } from "../services/deezerApi";
import "./Novita.css";

// Componente della pagina Novità
const Novita: React.FC = () => {
  const [newReleases, setNewReleases] = useState<Track[]>([]);
  const [radioEpisodes, setRadioEpisodes] = useState<Track[]>([]);
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carica le nuove uscite all'avvio
  useEffect(() => {
    const loadNewReleases = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Artisti diversi per le nuove uscite
        const newArtists = [
          "billie eilish",
          "dua lipa",
          "the weeknd",
          "ariana grande",
          "post malone",
          "olivia rodrigo",
          "harry styles",
          "doja cat",
          "bad bunny",
          "taylor swift",
          "drake",
          "justin bieber",
          "lana del rey",
          "sza",
          "lizzo",
          "charlie puth",
          "shawn mendes",
          "camila cabello",
          "halsey",
          "the chainsmokers",
          "marshmello",
          "calvin harris",
          "david guetta",
          "martin garrix",
        ];

        // Seleziona artisti casuali
        const shuffledNewArtists = newArtists.sort(() => 0.5 - Math.random());

        // Carica brani da artisti recenti (seleziona 8 artisti casuali)
        const promises = shuffledNewArtists
          .slice(0, 8)
          .map((artist) => DeezerApiService.searchTracks(artist));

        const results = await Promise.all(promises);
        const allTracks = results.flat();

        // Filtra e ordina per unicità
        const uniqueTracks = allTracks
          .filter(
            (track, index, self) =>
              index === self.findIndex((t) => t.id === track.id)
          )
          .slice(0, 10); // Limita per la sezione nuove uscite

        setNewReleases(uniqueTracks);

        // Carica anche gli episodi radio (simulati con altri brani)
        const radioArtists = [
          "the weeknd",
          "michael bublé",
          "carly rae jepsen",
          "stephan moccio",
          "julia michaels",
        ];
        const radioPromises = radioArtists.map((artist) =>
          DeezerApiService.searchTracks(artist)
        );

        const radioResults = await Promise.all(radioPromises);
        const radioTracks = radioResults
          .flat()
          .filter(
            (track, index, self) =>
              index === self.findIndex((t) => t.id === track.id)
          )
          .slice(0, 5);

        setRadioEpisodes(radioTracks);
      } catch (err) {
        setError("Errore nel caricamento delle novità. Riprova più tardi.");
        console.error("Errore nel caricamento delle novità:", err);
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
      {/* Media Bar */}
      <div className="media-bar">
        <div className="media-controls">
          <button className="control-btn prev-btn">⏮</button>
          <button className="control-btn play-btn">⏸</button>
          <button className="control-btn next-btn">⏭</button>
        </div>
        <div className="media-info">
          <div className="track-progress">
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </div>
        </div>
        <div className="media-options">
          <button className="option-btn volume-btn">🔊</button>
          <button className="option-btn airplay-btn">📡</button>
        </div>
      </div>

      <Container fluid>
        {/* Header */}
        <Row className="novita-header">
          <Col>
            <div className="page-header">
              <h1 className="page-title">Novità</h1>
              <div className="page-subtitle">
                <span className="subtitle-text">NUOVA STAZIONE RADIO</span>
                <span className="subtitle-text">NUOVA STAZIONE RADIO</span>
              </div>
              <p className="page-description">
                Rilassati, rifletti pensiero noi. Ascolta Apple Music Chill
              </p>
              <p className="page-description-secondary">
                Ecco la nuova casa della musica latina
              </p>
            </div>
          </Col>
        </Row>

        {/* Sezioni principali Chill e MUSICA UNO */}
        <Row className="main-sections">
          <Col md={6} className="mb-4">
            <div className="chill-section">
              <div className="section-content">
                <div className="section-logo">Chill</div>
                <div className="section-badge">🍎 Music Radio</div>
              </div>
            </div>
          </Col>
          <Col md={6} className="mb-4">
            <div className="musica-uno-section">
              <div className="section-content">
                <div className="section-logo">MUSICA UNO</div>
                <div className="section-badge">🍎 Music Radio</div>
              </div>
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

            {/* Nuovi episodi radio */}
            {!isLoading && !error && radioEpisodes.length > 0 && (
              <Row className="radio-episodes-section">
                <Col>
                  <h2 className="section-title">
                    Nuovi episodi radio <span className="chevron-right">›</span>
                  </h2>
                  <Row>
                    {radioEpisodes.map((track) => (
                      <Col
                        key={track.id}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        xl={2}
                        className="mb-4"
                      >
                        <div className="radio-episode-card">
                          <div className="episode-image">
                            <img
                              src={
                                track.album?.cover_medium ||
                                "/placeholder-album.jpg"
                              }
                              alt={track.title}
                            />
                            <div className="episode-overlay">
                              <div className="play-button">
                                <i className="fas fa-play"></i>
                              </div>
                            </div>
                          </div>
                          <div className="episode-info">
                            <h4 className="episode-title">{track.title}</h4>
                            <p className="episode-artist">
                              {track.artist?.name}
                            </p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            )}

            {/* Nuove uscite */}
            {!isLoading && !error && newReleases.length > 0 && (
              <Row className="new-releases-section">
                <Col>
                  <h2 className="section-title">
                    Nuove uscite <span className="chevron-right">›</span>
                  </h2>
                  <Row>
                    {newReleases.map((track) => (
                      <Col
                        key={track.id}
                        xs={6}
                        sm={4}
                        md={3}
                        lg={2}
                        xl={2}
                        className="mb-4"
                      >
                        <div className="new-release-card">
                          <div className="release-placeholder">
                            <i className="fas fa-music"></i>
                          </div>
                          <div className="release-info">
                            <p className="release-title">Song Placeholder</p>
                            <p className="release-artist">Artist Placeholder</p>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            )}

            {/* Altro da esplorare */}
            {!isLoading && !error && (
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
                      <span className="explore-text">Worldwide</span>
                      <span className="chevron-right">›</span>
                    </div>
                    <div className="explore-item">
                      <span className="explore-text">Hit del passato</span>
                      <span className="chevron-right">›</span>
                    </div>
                    <div className="explore-item">
                      <span className="explore-text">Classifiche</span>
                      <span className="chevron-right">›</span>
                    </div>
                    <div className="explore-item">
                      <span className="explore-text">Video musicali</span>
                      <span className="chevron-right">›</span>
                    </div>
                    <div className="explore-item">
                      <span className="explore-text">Nuovi artisti</span>
                      <span className="chevron-right">›</span>
                    </div>
                  </div>
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
                    <p>
                      Non siamo riusciti a caricare le novità al momento.
                      Riprova più tardi.
                    </p>
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
