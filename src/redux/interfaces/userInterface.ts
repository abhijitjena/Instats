export interface IUserState {
  isNewUser: boolean;
  followHistory: IFollowersFollowing;
}

export interface IFollowersFollowing {
  followerHistory: { [year: string]: number };
  followingHistory: { [year: string]: number };
}
