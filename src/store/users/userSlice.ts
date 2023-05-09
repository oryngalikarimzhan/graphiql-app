import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '../../types/state/IUserState';

const initialState: IUserState = {
  email: '',
  token: '',
  id: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserState>) => {
      // state = { ...state, ...action.payload };
      Object.assign(state, action.payload);
    },
    removeUser: (state) => {
      state.email = '';
      state.token = '';
      state.id = '';
    },
  },
});

export const userActions = userSlice.actions;

export const userReducer = userSlice.reducer;
