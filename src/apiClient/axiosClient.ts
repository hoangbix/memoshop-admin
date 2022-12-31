import axios from 'axios'
import authConfig from 'src/configs/auth'

export const getTokenLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
}

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getTokenLocalStorage(authConfig.storageTokenKeyName)
  }
})

axiosClient.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

export default axiosClient
