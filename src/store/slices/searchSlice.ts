import { createSlice } from '@reduxjs/toolkit';

interface SearchState {
  term: string;
}

const initialState: SearchState = {
  term: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTerm: (state, action) => {
      state.term = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setTerm } = searchSlice.actions;
