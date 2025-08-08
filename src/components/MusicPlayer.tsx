import React, { useRef, useEffect, useState } from 'react';
import { Container, Row, Col, Button, ProgressBar } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { togglePlayPause, setVolume, stopPlayback } from '../store/playerSlice';
import './MusicPlayer.css';

// Componente del player musicale
const MusicPlayer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentTrack, isPlaying, volume } = useAppSelector(state => state.player);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Effetto per gestire la riproduzione
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  // Effetto per gestire il volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Gestisce l'aggiornamento del tempo
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Gestisce il caricamento dei metadati
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Gestisce la fine del brano
  const handleEnded = () => {
    dispatch(stopPlayback());
    setCurrentTime(0);
  };

  // Gestisce il click sulla barra di progresso
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Formatta il tempo in mm:ss
  const formatTime = (time: number): string => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Gestisce il cambio volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    dispatch(setVolume(newVolume));
  };

  // Se non c'è un brano corrente, non mostrare il player
  if (!currentTrack) {
    return null;
  }

  return (
    <div className="music-player">
      {/* Audio element nascosto */}
      <audio
        ref={audioRef}
        src={currentTrack.preview}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <Container fluid>
        <Row className="align-items-center">
          {/* Informazioni del brano */}
          <Col xs={12} md={4} className="track-info-section">
            <div className="d-flex align-items-center">
              <img 
                src={currentTrack.album.cover_medium} 
                alt={currentTrack.album.title}
                className="player-album-art"
              />
              <div className="track-details">
                <div className="player-track-title">{currentTrack.title_short}</div>
                <div className="player-track-artist">{currentTrack.artist.name}</div>
              </div>
            </div>
          </Col>

          {/* Controlli di riproduzione */}
          <Col xs={12} md={4} className="player-controls-section">
            <div className="player-controls">
              <Button 
                variant="outline-light" 
                size="sm" 
                className="control-button"
                onClick={() => dispatch(togglePlayPause())}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </Button>
              
              <Button 
                variant="outline-light" 
                size="sm" 
                className="control-button"
                onClick={() => dispatch(stopPlayback())}
              >
                ⏹️
              </Button>
            </div>
            
            {/* Barra di progresso */}
            <div className="progress-section">
              <span className="time-display">{formatTime(currentTime)}</span>
              <div 
                className="progress-bar-container"
                onClick={handleProgressClick}
              >
                <ProgressBar 
                  now={(currentTime / duration) * 100} 
                  className="custom-progress-bar"
                />
              </div>
              <span className="time-display">{formatTime(duration)}</span>
            </div>
          </Col>

          {/* Controlli volume */}
          <Col xs={12} md={4} className="volume-section">
            <div className="volume-controls">
              <span className="volume-icon">🔊</span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
              />
              <span className="volume-display">{volume}%</span>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MusicPlayer;