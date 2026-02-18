import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import type { User } from '@/types/api';

type ProfileSlice = Omit<User, 'createdAt'>;

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
