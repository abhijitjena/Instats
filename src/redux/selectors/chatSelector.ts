import { IChatsData } from '../interfaces/chatInterface';
import type { RootState } from '../store';

const getChatsData = (state: RootState): IChatsData => {
  const {
    chatReducer: { chatsData },
  } = state;
  return chatsData;
};

const getChatDataUploaded = (state: RootState): boolean => {
  const {
    chatReducer: { isChatDataUploaded },
  } = state;
  return isChatDataUploaded;
};

const ChatSelectors = {
  getChatsData,
  getChatDataUploaded,
};

export default ChatSelectors;
