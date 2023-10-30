import { IChatsData } from '../interfaces/chatInterface';
import type { RootState } from '../store';

const getChatsData = (state: RootState): IChatsData => {
  const {
    chatReducer: { chatsData },
  } = state;
  return chatsData;
};

const ChatSelectors = {
  getChatsData,
};

export default ChatSelectors;
