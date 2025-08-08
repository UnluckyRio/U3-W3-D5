import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Track } from '../store/favoritesSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import { setCurrentTrack } from '../store/playerSlice';
import './MusicCard.css';

// Props per il componente MusicCard
interface MusicCardProps {
  track: Track;
  showArtist?: boolean;
  size?: 'small' | 'medium' | 'large';
}

// Componente per visualizzare una card musicale
const MusicCard: React.FC<MusicCardProps> = ({ 
  track, 
  showArtist = true, 
  size = 'medium' 
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.tracks);
  const currentTrack = useAppSelector(state => state.player.currentTrack);
  const isPlaying = useAppSelector(state => state.player.isPlaying);
  
  // Verifica se il brano è nei preferiti
  const isFavorite = favorites.some(fav => fav.id === track.id);
  const isCurrentTrack = currentTrack?.id === track.id;

  // Gestisce il click sulla card per riprodurre il brano
  const handlePlayTrack = () => {
    dispatch(setCurrentTrack(track));
  };

  // Gestisce l'aggiunta/rimozione dai preferiti
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene il trigger del play
    
    if (isFavorite) {
      dispatch(removeFromFavorites(track.id));
    } else {
      dispatch(addToFavorites(track));
    }
  };

  // Formatta la durata in minuti:secondi
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card 
      className={`music-card music-card-${size} ${isCurrentTrack ? 'playing' : ''}`}
      onClick={handlePlayTrack}
    >
      <div className="card-image-container">
        <Card.Img 
          variant="top" 
          src={track.album.cover_medium} 
          alt={track.album.title}
          className="card-image"
        />
        
        {/* Overlay con controlli */}
        <div className="card-overlay">
          <Button 
            variant="light" 
            className="play-button"
            size="sm"
          >
            {isCurrentTrack && isPlaying ? '⏸️' : '▶️'}
          </Button>
          
          <Button 
            variant="outline-light" 
            className="favorite-button"
            size="sm"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? '❤️' : '🤍'}
          </Button>
        </div>
      </div>
      

    </Card>
  );
};

export default MusicCard;