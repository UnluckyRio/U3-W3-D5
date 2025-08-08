import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import playerReducer from './playerSlice';

// Configurazione dello store Redux
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    player: playerReducer,
  },
});

// Tipi per TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;