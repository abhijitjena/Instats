import {
  ILikedCreators,
  ILikedPostStats,
  IPostDateMap,
} from '../interfaces/contentInterface';
import type { RootState } from '../store';

const getContentData = (state: RootState): IPostDateMap => {
  const {
    contentReducer: { postsData },
  } = state;
  return postsData;
};

const getLikedPostsByCreator = (state: RootState): ILikedPostStats => {
  const {
    contentReducer: { likedPostStats },
  } = state;
  return likedPostStats;
};

const getSavedPostStats = (state: RootState): ILikedPostStats => {
  const {
    contentReducer: { savedPostStats },
  } = state;
  return savedPostStats;
};

const getThreadsCount = (state: RootState): number => {
  const {
    contentReducer: { threadCount },
  } = state;
  return threadCount;
};

const ContentSelectors = {
  getContentData,
  getLikedPostsByCreator,
  getSavedPostStats,
  getThreadsCount,
};

export default ContentSelectors;
