export interface IChatState {
  chatsData: IChatsData;
}

export interface IChatsData {
  [chatName: string]: ISingleChat;
}

export interface IChatDateMap {
  [year: string]: { [month: string]: { [date: string]: IDateData } };
}

export interface ISingleChat {
  threadName: string;
  title: string;
  dateMap: IChatDateMap;
  totalReels: number;
  totalTexts: number;
}

export interface IDateData {
  numOfTexts: number;
  numOfReels: number;
}
