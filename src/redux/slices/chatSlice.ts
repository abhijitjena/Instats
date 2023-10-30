/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { ISliceNames } from '../interfaces';
import type { IChatsData, IChatState } from '../interfaces/chatInterface';

const initialChatState: IChatState = {
  chatsData: {},
};

const chatSlice = createSlice({
  name: ISliceNames.chatSlice,
  initialState: initialChatState,
  reducers: {
    setChatInfo(state, action: PayloadAction<IChatsData>) {
      state.chatsData = action.payload;
    },
  },
});

const { reducer: chatReducer, actions: chatActions } = chatSlice;

export { chatActions, chatReducer };
