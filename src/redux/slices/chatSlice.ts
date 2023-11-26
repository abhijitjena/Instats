/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createAction, createSlice } from '@reduxjs/toolkit';

import { ISliceNames } from '../interfaces';
import type { IChatState, ISingleChat } from '../interfaces/chatInterface';

const initialChatState: IChatState = {
  chatsData: {},
  isChatDataUploaded: false,
};

const chatSlice = createSlice({
  name: ISliceNames.chatSlice,
  initialState: initialChatState,
  reducers: {
    setChatInfo(state, action: PayloadAction<ISingleChat>) {
      let prevChats = state.chatsData;
      if (!Object.hasOwn(prevChats, action.payload.threadName))
        prevChats = { ...prevChats, [action.payload.threadName]: action.payload };
      else {
        const prevChatData = prevChats[action.payload.threadName];
        prevChatData.totalReels = prevChatData.totalReels + action.payload.totalReels;
        prevChatData.totalTexts = prevChatData.totalTexts + action.payload.totalTexts;
        Object.keys(action.payload.dateMap).forEach((payloadYear) => {
          if (!Object.hasOwn(prevChatData.dateMap, payloadYear))
            prevChatData.dateMap = {
              ...prevChatData.dateMap,
              [payloadYear]: action.payload.dateMap[payloadYear],
            };
          else {
            Object.keys(action.payload.dateMap[payloadYear]).forEach((payloadMonth) => {
              if (!Object.hasOwn(prevChatData.dateMap[payloadYear], payloadMonth))
                prevChatData.dateMap[payloadYear] = {
                  ...prevChatData.dateMap[payloadYear],
                  [payloadMonth]: action.payload.dateMap[payloadYear][payloadMonth],
                };
              else {
                Object.keys(action.payload.dateMap[payloadYear][payloadMonth]).forEach(
                  (payloadDate) => {
                    if (
                      !Object.hasOwn(
                        prevChatData.dateMap[payloadYear][payloadMonth],
                        payloadDate,
                      )
                    )
                      prevChatData.dateMap[payloadYear][payloadMonth] = {
                        ...prevChatData.dateMap[payloadYear][payloadMonth],
                        [payloadDate]:
                          action.payload.dateMap[payloadYear][payloadMonth][payloadDate],
                      };
                    else {
                      prevChatData.dateMap[payloadYear][payloadMonth][payloadDate] = {
                        numOfTexts:
                          prevChatData.dateMap[payloadYear][payloadMonth][payloadDate]
                            .numOfTexts +
                          action.payload.dateMap[payloadYear][payloadMonth][payloadDate]
                            .numOfTexts,
                        numOfReels:
                          prevChatData.dateMap[payloadYear][payloadMonth][payloadDate]
                            .numOfReels +
                          action.payload.dateMap[payloadYear][payloadMonth][payloadDate]
                            .numOfReels,
                      };
                    }
                  },
                );
              }
            });
          }
        });
        prevChats[action.payload.threadName] = prevChatData;
      }
      state.chatsData = prevChats;
    },
    setChatUploaded(state, action: PayloadAction<boolean>) {
      state.isChatDataUploaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetChatSlice, () => {
      return initialChatState;
    });
  },
});

export const resetChatSlice = createAction('reset/chat');

const { reducer: chatReducer, actions: chatActions } = chatSlice;

export { chatActions, chatReducer };
