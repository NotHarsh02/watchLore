import { createSlice } from '@reduxjs/toolkit';
// i used this store for carousel component
const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: []
  },
  reducers: {
    fetchMovies: (state, action) => {
      state.movies = action.payload;
    }
  }
});

export const movieActions= movieSlice.actions;
export default movieSlice;