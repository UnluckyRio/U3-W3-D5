import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from './favoritesSlice';

// Stato iniziale per il player
interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
}

const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 50,
};

// Slice per gestire il player musicale
const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // Imposta il brano corrente
    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },
    // Avvia/ferma la riproduzione
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    // Imposta il volume
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },
    // Ferma la riproduzione
    stopPlayback: (state) => {
      state.isPlaying = false;
      state.currentTrack = null;
    },
  },
});

export const { setCurrentTrack, togglePlayPause, setVolume, stopPlayback } = playerSlice.actions;
export default playerSlice.reducer;