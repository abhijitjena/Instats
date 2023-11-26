import { ILikedPostStats, IPostDateMap } from '../interfaces/contentInterface';
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

const getPostDataUploaded = (state: RootState): boolean => {
  const {
    contentReducer: { isPostDataUploaded },
  } = state;
  return isPostDataUploaded;
};

const getLikedPostDataUploaded = (state: RootState): boolean => {
  const {
    contentReducer: { isLikedPostDataUploaded },
  } = state;
  return isLikedPostDataUploaded;
};

const getSavedPostDataUploaded = (state: RootState): boolean => {
  const {
    contentReducer: { isSavedPostDataUploaded },
  } = state;
  return isSavedPostDataUploaded;
};

const getThreadDataUploaded = (state: RootState): boolean => {
  const {
    contentReducer: { isThreadDataUploaded },
  } = state;
  return isThreadDataUploaded;
};

const ContentSelectors = {
  getContentData,
  getLikedPostsByCreator,
  getSavedPostStats,
  getThreadsCount,
  getPostDataUploaded,
  getLikedPostDataUploaded,
  getSavedPostDataUploaded,
  getThreadDataUploaded,
};

export default ContentSelectors;
