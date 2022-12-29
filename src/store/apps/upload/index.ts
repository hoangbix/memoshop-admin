import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from 'src/apiClient/axiosClient'
import { ReduxType, UploadState } from 'src/types/apps'

export const uploadImg = createAsyncThunk(
  'upload/uploadImg',
  async (payload: File[], { rejectWithValue }: ReduxType) => {
    try {
      const formData = new FormData()
      for (let i = 0; i < payload.length; i++) formData.append('images', payload[i])

      const { data } = await axiosClient.post('/files/upload', formData)

      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const deleteImg = createAsyncThunk('upload/deleteImg', async (id: string, { rejectWithValue }: ReduxType) => {
  try {
    await axiosClient.delete(`files/delete/${id}`)

    return id
  } catch (err: any) {
    return rejectWithValue(err.response.data)
  }
})

export const initialState: UploadState = {
  data: [],
  isLoading: false
}

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    resetUpload: state => {
      state.data = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(uploadImg.pending, state => {
        state.isLoading = true
      })
      .addCase(uploadImg.fulfilled, (state, action) => {
        state.data = action.payload
        state.isLoading = false
      })
      .addCase(uploadImg.rejected, state => {
        state.isLoading = false
      })

    builder.addCase(deleteImg.fulfilled, (state, action) => {
      state.data = state.data.filter(i => i.public_id !== action.payload)
    })
  }
})

export const { resetUpload } = uploadSlice.actions

export default uploadSlice.reducer
