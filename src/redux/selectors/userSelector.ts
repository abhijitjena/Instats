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

const UserSelectors = {
  getNewUserValue,
  getFollowHistory,
};

export default UserSelectors;
