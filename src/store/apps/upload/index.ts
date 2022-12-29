import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from 'src/apiClient/axiosClient'

export const uploadImg = createAsyncThunk('upload/uploadImg', async () => {
  const { data } = await axiosClient.post('/api/v1/product')

  return data
})

export const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(uploadImg.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default uploadSlice.reducer
