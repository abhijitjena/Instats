export interface IUserState {
  isNewUser: boolean;
  followHistory: IFollowersFollowing;
  isFollowDataUploaded: boolean;
}

export interface IFollowersFollowing {
  followerHistory: { [year: string]: number };
  followingHistory: { [year: string]: number };
}
