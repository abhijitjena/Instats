/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import { ISliceNames } from '../interfaces';
import {
  IContentState,
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
  isLikedPostDataUploaded: false,
  isPostDataUploaded: false,
  isSavedPostDataUploaded: false,
  isThreadDataUploaded: false,
};

const contentSlice = createSlice({
  name: ISliceNames.contentSlice,
  initialState: initialContentState,
  reducers: {
    setContentInfo(state, action: PayloadAction<IPostDateMap>) {
      state.postsData = action.payload;
    },
    setCreatorLikesInfo(state, action: PayloadAction<ILikedPostStats>) {
      const prevLikes = state.likedPostStats;
      Object.keys(action.payload.yearData).forEach((year) => {
        if (Object.prototype.hasOwnProperty.call(prevLikes.yearData, year)) {
          prevLikes.yearData[year] =
            prevLikes.yearData[year] + action.payload.yearData[year];
        } else
          prevLikes.yearData = {
            ...prevLikes.yearData,
            [year]: action.payload.yearData[year],
          };
      });
      const prevCreators = prevLikes.topCreators.map((creator) => creator[0]);
      const newCreators = action.payload.topCreators.map((creator) => creator[0]);
      action.payload.topCreators.forEach((creator) => {
        if (prevCreators.includes(creator[0])) {
          const prevIndex = prevCreators.indexOf(creator[0]);
          const newIndex = newCreators.indexOf(creator[0]);
          prevLikes.topCreators[prevIndex][1] =
            prevLikes.topCreators[prevIndex][1] + action.payload.topCreators[newIndex][1];
        } else prevLikes.topCreators.push(creator);
      });
      state.likedPostStats = prevLikes;
    },
    setSavedPostsInfo(state, action: PayloadAction<ILikedPostStats>) {
      const prevSaves = state.savedPostStats;
      Object.keys(action.payload.yearData).forEach((year) => {
        if (Object.prototype.hasOwnProperty.call(prevSaves.yearData, year)) {
          prevSaves.yearData[year] =
            prevSaves.yearData[year] + action.payload.yearData[year];
        } else
          prevSaves.yearData = {
            ...prevSaves.yearData,
            [year]: action.payload.yearData[year],
          };
      });
      const prevCreators = prevSaves.topCreators.map((creator) => creator[0]);
      const newCreators = action.payload.topCreators.map((creator) => creator[0]);
      action.payload.topCreators.forEach((creator) => {
        if (prevCreators.includes(creator[0])) {
          const prevIndex = prevCreators.indexOf(creator[0]);
          const newIndex = newCreators.indexOf(creator[0]);
          prevSaves.topCreators[prevIndex][1] =
            prevSaves.topCreators[prevIndex][1] + action.payload.topCreators[newIndex][1];
        } else prevSaves.topCreators.push(creator);
      });
      state.savedPostStats = prevSaves;
    },
    setThreadsInfo(state, action: PayloadAction<number>) {
      const prevThreads = state.threadCount;
      state.threadCount = prevThreads + action.payload;
    },
    setPostDataUploaded(state, action: PayloadAction<boolean>) {
      state.isPostDataUploaded = action.payload;
    },
    setLikedPostDataUploaded(state, action: PayloadAction<boolean>) {
      state.isLikedPostDataUploaded = action.payload;
    },
    setSavedPostDataUploaded(state, action: PayloadAction<boolean>) {
      state.isSavedPostDataUploaded = action.payload;
    },
    setThreadDataUploaded(state, action: PayloadAction<boolean>) {
      state.isThreadDataUploaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetContentSlice, () => {
      return initialContentState;
    });
  },
});

export const resetContentSlice = createAction('reset/content');

const { reducer: contentReducer, actions: contentActions } = contentSlice;

export { contentActions, contentReducer };
