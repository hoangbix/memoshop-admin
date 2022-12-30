import { createAsyncThunk } from '@reduxjs/toolkit'

import axiosClient from 'src/apiClient/axiosClient'
import { AddProductType } from 'src/pages/product/add'
import { ReduxType } from 'src/types/apps'

export const fetchProduct = createAsyncThunk('product/fetchProduct', async () => {
  const { data } = await axiosClient.get('/product')

  return data
})

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async (payload: AddProductType, { dispatch, rejectWithValue }: ReduxType) => {
    try {
      const { data } = await axiosClient.post('/product', payload)
      await dispatch(fetchProduct())

      return data
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (id: string, { dispatch, rejectWithValue }: ReduxType) => {
    try {
      await axiosClient.delete(`/product/${id}`)
      await dispatch(fetchProduct())
    } catch (err: any) {
      return rejectWithValue(err.response.data)
    }
  }
)
