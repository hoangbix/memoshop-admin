import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from 'src/apiClient/axiosClient'
import { ReduxType } from 'src/types/apps'

export const fetchCategory = createAsyncThunk('category/fetchCategory', async () => {
  const { data } = await axiosClient.get('/prod-category')

  return data
})

export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (params: any, { rejectWithValue, dispatch }: ReduxType) => {
    try {
      const { data } = await axiosClient.post('/prod-category', params)

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
