import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/interfaces/IUser';

type UsersState = {
  email: string;
  token: string;
  id: string;
};

const initialState: UsersState = {
  email: '',
  token: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UsersState>) => {
      state = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
