/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import { ISliceNames } from '../interfaces';
import type { IUserState } from '../interfaces/userInterface';

const initialUserState: IUserState = {
  isNewUser: true,
  followHistory: {
    followerHistory: {},
    followingHistory: {},
  },
  isFollowDataUploaded: false,
};

const userSlice = createSlice({
  name: ISliceNames.userSlice,
  initialState: initialUserState,
  reducers: {
    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.isNewUser = action.payload;
    },
    setFollowerHistory(state, action: PayloadAction<{ [year: string]: number }>) {
      const prevFollow = state.followHistory;
      Object.keys(action.payload).forEach((year) => {
        if (Object.hasOwn(prevFollow.followerHistory, year)) {
          prevFollow.followerHistory[year] =
            prevFollow.followerHistory[year] + action.payload[year];
        } else
          prevFollow.followerHistory = {
            ...prevFollow.followerHistory,
            [year]: action.payload[year],
          };
      });
      state.followHistory = prevFollow;
    },
    setFollowingHistory(state, action: PayloadAction<{ [year: string]: number }>) {
      const prevFollow = state.followHistory;
      Object.keys(action.payload).forEach((year) => {
        if (Object.hasOwn(prevFollow.followingHistory, year)) {
          prevFollow.followingHistory[year] =
            prevFollow.followingHistory[year] + action.payload[year];
        } else
          prevFollow.followingHistory = {
            ...prevFollow.followingHistory,
            [year]: action.payload[year],
          };
      });
      state.followHistory = prevFollow;
    },
    setFollowDataUploaded(state, action: PayloadAction<boolean>) {
      state.isFollowDataUploaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetUserSlice, () => {
      return initialUserState;
    });
  },
});

export const resetUserSlice = createAction('reset/user');

const { reducer: userReducer, actions: userActions } = userSlice;

export { userActions, userReducer };
