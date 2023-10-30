export interface IContentState {
  postsData: IPostDateMap;
  likedPostStats: ILikedPostStats;
  savedPostStats: ILikedPostStats;
  threadCount: number;
}

export interface IPostDateMap {
  [year: string]: { [month: string]: IPosts };
}

export interface ILikedPostDateMap {
  [year: string]: { [month: string]: number };
}

export interface IPosts {
  posts: number;
  reels: number;
  stories: number;
}

export interface ILikedPostStats {
  yearData: {
    [year: string]: number;
  };
  topCreators: [string, number][];
}

export interface ILikedCreators {
  [creator: string]: number;
}
