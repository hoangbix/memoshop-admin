import axios from 'axios'
import authConfig from 'src/configs/auth'

const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
}

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + getLocalStorage(authConfig.storageTokenKeyName)
  }
})

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axiosClient
