import { createSlice, type PayloadAction } from '@reduxjs/toolkit';


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


interface FavoritesState {
  tracks: Track[];
}

const initialState: FavoritesState = {
  tracks: [],
};


const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {

    addToFavorites: (state, action: PayloadAction<Track>) => {
      const exists = state.tracks.find(track => track.id === action.payload.id);
      if (!exists) {
        state.tracks.push(action.payload);
      }
    },

    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.tracks = state.tracks.filter(track => track.id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;