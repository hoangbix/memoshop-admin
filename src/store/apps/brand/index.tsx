import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from 'src/apiClient/axiosClient'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}

export const fetchBrand = createAsyncThunk('brand/fetchBrand', async () => {
  const { data } = await axiosClient.get('/brand')

  return data
})

export const addBrand = createAsyncThunk(
  'brand/addBrand',
  async (params: any, { rejectWithValue, dispatch }: Redux) => {
    try {
      const { data } = await axiosClient.post('/brand', params)

      await dispatch(fetchBrand())

      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const brandSlice = createSlice({
  name: 'brand',
  initialState: {
    data: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchBrand.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

export default brandSlice.reducer
