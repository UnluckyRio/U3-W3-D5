import React from 'react';
import { Card, Button } from 'react-bootstrap';
import type { Track } from "../store/favoritesSlice";
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addToFavorites, removeFromFavorites } from '../store/favoritesSlice';
import { setCurrentTrack } from '../store/playerSlice';
import './MusicCard.css';


interface MusicCardProps {
  track: Track;
  size?: 'small' | 'medium' | 'large';
}


const MusicCard: React.FC<MusicCardProps> = ({ 
  track, 
  size = 'medium' 
}) => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(state => state.favorites.tracks);
  const currentTrack = useAppSelector(state => state.player.currentTrack);
  const isPlaying = useAppSelector(state => state.player.isPlaying);
  

  const isFavorite = favorites.some(fav => fav.id === track.id);
  const isCurrentTrack = currentTrack?.id === track.id;


  const handlePlayTrack = () => {
    dispatch(setCurrentTrack(track));
  };


  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFavorite) {
      dispatch(removeFromFavorites(track.id));
    } else {
      dispatch(addToFavorites(track));
    }
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