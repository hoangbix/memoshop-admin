import { createSlice } from '@reduxjs/toolkit'
import { fetchProduct } from './product.thunk'

export const productSlice = createSlice({
  name: 'product',
  initialState: {
    data: [],
    total: 0
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
