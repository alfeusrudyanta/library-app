import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

type ProfileSlice = {
  id: number;
  name: string;
  email: string;
  phone: null | string;
  profilePhoto: null | string;
  role: 'USER' | 'ADMIN';
};

const initialState: ProfileSlice = {
  id: 0,
  name: 'User',
  email: 'user@mail.com',
  phone: null,
  profilePhoto: null,
  role: 'USER',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<ProfileSlice>) => {
      return action.payload;
    },
  },
});

export const { setProfile } = profileSlice.actions;
export const selectProfile = (state: RootState) => state.profile;

export default profileSlice.reducer;
