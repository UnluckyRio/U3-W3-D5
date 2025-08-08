import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaccia per definire la struttura di un brano
export interface Track {
  id: number;
  title: string;
  title_short: string;
  duration: number;
  preview: string;
  artist: {
    id: number;
    name: string;
    picture_medium: string;
  };
  album: {
    id: number;
    title: string;
    cover_medium: string;
  };
}

// Stato iniziale per i preferiti
interface FavoritesState {
  tracks: Track[];
}

const initialState: FavoritesState = {
  tracks: [],
};

// Slice per gestire i brani preferiti
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    // Aggiunge un brano ai preferiti
    addToFavorites: (state, action: PayloadAction<Track>) => {
      const exists = state.tracks.find(track => track.id === action.payload.id);
      if (!exists) {
        state.tracks.push(action.payload);
      }
    },
    // Rimuove un brano dai preferiti
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.tracks = state.tracks.filter(track => track.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;