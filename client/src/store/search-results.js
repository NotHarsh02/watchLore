import { createSlice } from '@reduxjs/toolkit';

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    items: []
  },
  reducers: {
    fetchItems: (state, action) => {
      state.items = action.payload;
    }
  }
});

export const { fetchItems} = itemsSlice.actions;
export default itemsSlice.reducer;
