import { createContext, useEffect, useState, ReactNode } from 'react'

import { useRouter } from 'next/router'

import jwt from 'jsonwebtoken'

import authConfig from 'src/configs/auth'

import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'
import axiosClient from 'src/apiClient/axiosClient'

const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  isLoadingBtn: false,
  setUser: () => null,
  setLoading: () => Boolean,
  isInitialized: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  setIsInitialized: () => Boolean,
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [isLoadingBtn, setLoadingBtn] = useState<boolean>(defaultProvider.isLoadingBtn)
  const [isInitialized, setIsInitialized] = useState<boolean>(defaultProvider.isInitialized)

  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      setIsInitialized(true)
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        setLoading(true)

        const decoded = jwt.decode(storedToken, { complete: true })
        if (decoded) {
          // @ts-ignore
          const { id: userId } = decoded.payload
          await axiosClient
            .get(`${authConfig.meEndpoint}/${userId}`)
            .then(async response => {
              setLoading(false)
              setUser(response.data)
            })
            .catch(() => {
              localStorage.removeItem('userData')
              localStorage.removeItem('refreshToken')
              localStorage.removeItem('access_token')
              setUser(null)
              setLoading(false)
            })
        }
      } else {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    setLoadingBtn(true)

    axiosClient
      .post(authConfig.loginEndpoint, params)
      .then(async res => {
        window.localStorage.setItem(authConfig.storageTokenKeyName, res.data.access_token)
      })
      .then(() => {
        const token = window.localStorage.getItem(authConfig.storageTokenKeyName)!
        const decoded = jwt.decode(token, { complete: true })

        if (decoded) {
          // @ts-ignore
          const { id: userId } = decoded.payload

          axiosClient
            .get(`${authConfig.meEndpoint}/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then(async response => {
              const returnUrl = router.query.returnUrl

              setUser(response.data)
              await window.localStorage.setItem('userData', JSON.stringify(response.data))

              const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

              router.replace(redirectURL as string)
              setLoadingBtn(false)
            })
            .catch(err => {
              if (errorCallback) errorCallback(err)
              setLoadingBtn(false)
            })
        }
      })
      .catch(err => {
        if (errorCallback) errorCallback(err)
        setLoadingBtn(false)
      })
  }

  const handleLogout = () => {
    setUser(null)
    setIsInitialized(false)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axiosClient
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ email: params.email, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    isLoadingBtn,
    isInitialized,
    setIsInitialized,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
