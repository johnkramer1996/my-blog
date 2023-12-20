import { createAsyncThunk } from '@reduxjs/toolkit'
import { Message, messageApi } from 'entities/message'

export const readMessagesThunk = createAsyncThunk<void, { messages: Message[]; currentMemberId: string }, { state: RootState }>(
  'session/logout',
  async ({ messages, currentMemberId }, { dispatch }) => {
    try {
      const results = messages
        .filter((message) => !(message.isRead || !(message.toMemberId === currentMemberId)))
        .map(async (message) => {
          return dispatch(messageApi.endpoints.updateMessage.initiate({ messageId: message.id, isRead: true }))
        })
      await Promise.all(results)
    } finally {
      //
    }
  }
)
