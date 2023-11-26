import { IFollowersFollowing } from '../interfaces/userInterface';
import type { RootState } from '../store';

const getNewUserValue = (state: RootState): boolean => {
  const {
    userReducer: { isNewUser },
  } = state;
  return isNewUser;
};

const getFollowHistory = (state: RootState): IFollowersFollowing => {
  const {
    userReducer: { followHistory },
  } = state;
  return followHistory;
};

const getFollowDataUploaded = (state: RootState): boolean => {
  const {
    userReducer: { isFollowDataUploaded },
  } = state;
  return isFollowDataUploaded;
};

const UserSelectors = {
  getNewUserValue,
  getFollowHistory,
  getFollowDataUploaded,
};

export default UserSelectors;
