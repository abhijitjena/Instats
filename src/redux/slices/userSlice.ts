/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ISliceNames } from '../interfaces';
import type { IFollowersFollowing, IUserState } from '../interfaces/userInterface';

const initialUserState: IUserState = {
  isNewUser: true,
  followHistory: {
    followerHistory: {},
    followingHistory: {},
  },
};

const userSlice = createSlice({
  name: ISliceNames.userSlice,
  initialState: initialUserState,
  reducers: {
    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.isNewUser = action.payload;
    },
    setFollowHistory(state, action: PayloadAction<IFollowersFollowing>) {
      state.followHistory = action.payload;
    },
  },
});

const { reducer: userReducer, actions: userActions } = userSlice;

export { userActions, userReducer };
