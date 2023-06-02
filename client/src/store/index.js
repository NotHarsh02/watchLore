import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './search-results';
import movieSlice from './movies'
import userSlice from "./signin"
import arraySlice from './favouritesarray';
const store = configureStore({
  reducer: {
    items: itemsReducer,
    movies:movieSlice.reducer,
    issignin: userSlice.reducer,
    favmovies:arraySlice.reducer
  }
});

export default store;