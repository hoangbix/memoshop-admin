import { configureStore } from '@reduxjs/toolkit'

import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import brand from 'src/store/apps/brand'
import upload from 'src/store/apps/upload'
import product from 'src/store/apps/product'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import category from 'src/store/apps/category'
import permissions from 'src/store/apps/permissions'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    brand,
    upload,
    invoice,
    product,
    category,
    calendar,
    permissions
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
