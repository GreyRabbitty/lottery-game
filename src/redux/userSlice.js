import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state = action.payload;
      localStorage.setItem('user', JSON.stringify(state.data));
    },
  },
});

export const {
  updateUser,
} = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
