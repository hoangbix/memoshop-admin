import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
  const { data } = await axios.get('/api/v1/product')

  return data
})

export const deleteInvoice = createAsyncThunk(
  'product/deleteData',
  async (id: number | string, { dispatch }: Redux) => {
    const { data } = await axios.delete('/apps/invoice/delete', {
      data: id
    })
    await dispatch(fetchProduct())

    return data
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    total: 1
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.data = action.payload
      state.total = action.payload.length
    })
  }
})

export default productSlice.reducer
