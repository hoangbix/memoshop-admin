import axios from 'axios'
// import authConfig from 'src/configs/auth'

// const getLocalStorageItem = (key: string) => {
//   return typeof window !== undefined ? window.localStorage.getItem(key) : null
// }

// const token = getLocalStorageItem(authConfig.storageTokenKeyName)

const axiosClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json'
    // Authorization: `Bearer ${token}`
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
