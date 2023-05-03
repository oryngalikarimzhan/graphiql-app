import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../types/interfaces/IUser';

type UsersState = {
  list: IUser[];
};

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUser>) => {
      state.list.push(action.payload);
    },
  },
});

export const usersActions = usersSlice.actions;

export const usersReducer = usersSlice.reducer;
