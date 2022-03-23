/* eslint-disable @typescript-eslint/no-empty-function */
import {
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useLazyQuery, useMutation } from '@apollo/client'

import { Toast, useDispatch } from 'system/store'
import { Account } from 'system/types'
import {
  GET_ME,
  LOGIN_MUTATION,
  REFRESH_TOKEN_MUTATION,
  REGISTRATION_MUTATION,
  TRIGGER_LOGOUT_MUTATION,
} from './gql'
import {
  GetMe,
  Login,
  LoginInput,
  RefreshToken,
  Register,
  RegisterInput,
} from 'system/generated/gql.types'

type AuthContextType = {
  authenticated: boolean
  account: Account
  setAccessToken: Dispatch<React.SetStateAction<string>>
  setRefreshToken: Dispatch<React.SetStateAction<string>>
  // setAccount: Dispatch<React.SetStateAction<Account>>
  gqlContext: {
    context: {
      headers: {
        Authorization: string
      }
    }
  }
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  account: {} as Account,
  // setAccount: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  gqlContext: {
    context: {
      headers: {
        Authorization: '',
      },
    },
  },
})

export function AuthProvider(props: ComponentPropsWithoutRef<'div'>) {
  const [authenticated, setAuthStatus] = useState(false)
  const [account, setAccount] = useState<Account>({} as Account)
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  const gqlContext = useMemo(
    () => ({
      context: { headers: { Authorization: `Bearer ${accessToken}` } },
    }),
    [accessToken]
  )

  const [sendFetchAccount, {}] = useLazyQuery<GetMe>(GET_ME, {
    ...gqlContext,
    onCompleted({ me: response }) {
      if (response) {
        setAccount({ ...response } as unknown as Account)
        setAuthStatus(true)
      }
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const [sendRefreshToken, {}] = useMutation<RefreshToken>(
    REFRESH_TOKEN_MUTATION,
    {
      onCompleted: ({ refreshAccessToken: response }) => {
        if (response.isSuccess) {
          setAccessToken(response.accessToken)
          setRefreshToken(response.refreshToken)
        }
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    localStorage.clear()

    if (refreshToken && accessToken)
      sendRefreshToken({ variables: { input: { accessToken, refreshToken } } })
  }, [])

  useEffect(() => {
    localStorage.setItem('access_token', accessToken)
    if (!accessToken) {
      setAuthStatus(false)
      setAccount({} as Account)
      return
    }
  }, [accessToken])

  useEffect(() => {
    localStorage.setItem('refresh_token', refreshToken)
  }, [refreshToken])

  useEffect(() => {
    accessToken && sendFetchAccount(gqlContext)
  }, [gqlContext])

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        account,
        setAccessToken,
        setRefreshToken,
        gqlContext,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const {
    authenticated,
    account,
    setAccessToken,
    setRefreshToken,
    gqlContext,
  } = useContext(AuthContext)
  const dispatch = useDispatch()

  const [sendRegister, { loading: registering }] = useMutation<Register>(
    REGISTRATION_MUTATION,
    {
      onCompleted({ register: response }) {
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        dispatch({ type: 'CLOSE_REGISTER_POPUP' })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [sendLogin, { loading: logginIn }] = useMutation<Login>(
    LOGIN_MUTATION,
    {
      onCompleted({ login: response }) {
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        dispatch({ type: 'CLOSE_LOGIN_POPUP' })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [triggerLogout] = useMutation(TRIGGER_LOGOUT_MUTATION)

  return {
    loading: registering || logginIn,
    authenticated,
    account,
    register: (input: RegisterInput) => sendRegister({ variables: { input } }),
    openRegisterPopup: () => dispatch({ type: 'OPEN_REGISTER_POPUP' }),
    login: (input: LoginInput) => sendLogin({ variables: { input } }),
    openLoginPopup: () => dispatch({ type: 'OPEN_LOGIN_POPUP' }),
    logout() {
      triggerLogout()
      setAccessToken('')
      setRefreshToken('')
    },
    gqlContext,
  }
}
