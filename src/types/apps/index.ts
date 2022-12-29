import { Dispatch } from 'react'

export type UploadImgType = {
  asset_id: string
  public_id: string
  url: string
}

export interface UploadState {
  data: UploadImgType[]
  isLoading: boolean
}

export interface ReduxType {
  getState: any
  dispatch: Dispatch<any>
  rejectWithValue: any
}
