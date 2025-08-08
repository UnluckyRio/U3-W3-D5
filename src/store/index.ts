import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import playerReducer from './playerSlice';


export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    player: playerReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;