/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ISliceNames } from '../interfaces';
import {
  IContentState,
  ILikedCreators,
  ILikedPostStats,
  IPostDateMap,
} from '../interfaces/contentInterface';

const initialContentState: IContentState = {
  postsData: {},
  likedPostStats: {
    yearData: {},
    topCreators: [],
  },
  savedPostStats: {
    topCreators: [],
    yearData: {},
  },
  threadCount: 0,
};

const contentSlice = createSlice({
  name: ISliceNames.contentSlice,
  initialState: initialContentState,
  reducers: {
    setContentInfo(state, action: PayloadAction<IPostDateMap>) {
      state.postsData = action.payload;
    },
    setCreatorLikesInfo(state, action: PayloadAction<ILikedPostStats>) {
      state.likedPostStats = action.payload;
    },
    setSavedPostsInfo(state, action: PayloadAction<ILikedPostStats>) {
      state.savedPostStats = action.payload;
    },
    setThreadsInfo(state, action: PayloadAction<number>) {
      state.threadCount = action.payload;
    },
  },
});

const { reducer: contentReducer, actions: contentActions } = contentSlice;

export { contentActions, contentReducer };
