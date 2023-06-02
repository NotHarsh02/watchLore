import { createSlice } from '@reduxjs/toolkit';
// for creation of fav movie array
const arraySlice = createSlice({
  name: 'favmovies',
  initialState: {
    movies: []
  },
  reducers: {
    addtofavourites (state, action) {
      state.movies = state.movies.concat(action.payload);
    },
    // removefromfavorites(state,action){
    //  const index=state.movies.indexOf(action.payload);
    //  if (index > -1) { // only splice array when item is found
    //   state.movies.splice(index, 1); // 2nd parameter means remove one item only
    // }
    
    // }
  }
});

export const arrayActions= arraySlice.actions;
export default arraySlice;