import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'
import authConfig from 'src/configs/auth'

const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const { data } = await axios.get('/api/v1/prod-category')

  return data
})

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (params: any, { rejectWithValue, dispatch }: Redux) => {
    try {
      const { data } = await axios.post('/api/v1/prod-category', params, {
        headers: {
          Authorization: 'Bearer ' + getLocalStorage(authConfig.storageTokenKeyName)
        }
      })

      await dispatch(fetchCategory())

      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default categorySlice.reducer
