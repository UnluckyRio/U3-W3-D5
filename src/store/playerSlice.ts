import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Track } from './favoritesSlice';


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


const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {

    setCurrentTrack: (state, action: PayloadAction<Track>) => {
      state.currentTrack = action.payload;
      state.isPlaying = true;
    },

    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },

    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
    },

    stopPlayback: (state) => {
      state.isPlaying = false;
      state.currentTrack = null;
    },
  },
});

export const { setCurrentTrack, togglePlayPause, setVolume, stopPlayback } = playerSlice.actions;
export default playerSlice.reducer;