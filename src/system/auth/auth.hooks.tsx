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
import {
  LazyQueryResult,
  OperationVariables,
  QueryLazyOptions,
  useLazyQuery,
  useMutation,
} from '@apollo/client'

import { Toast, useDispatch } from 'system/store'
import { Account } from 'system/types'
import {
  LOGIN_MUTATION,
  ME_QUERY,
  REFRESH_TOKEN_MUTATION,
  REGISTRATION_MUTATION,
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
  fetchAccount: (
    options?: QueryLazyOptions<OperationVariables>
  ) => Promise<LazyQueryResult<GetMe, OperationVariables>>
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
  setAccessToken: () => {},
  setRefreshToken: () => {},
  fetchAccount: () =>
    ({} as Promise<LazyQueryResult<GetMe, OperationVariables>>),
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

  const [sendFetchAccount, {}] = useLazyQuery<GetMe>(ME_QUERY, {
    ...gqlContext,
    onCompleted({ me: response }) {
      if (response) {
        setAccount({ ...response })
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
    }
  )

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    const refreshToken = localStorage.getItem('refresh_token')
    localStorage.clear()

    if (refreshToken) {
      sendRefreshToken({ variables: { input: { accessToken, refreshToken } } })
    }
  }, [])

  useEffect(() => {
    if (!accessToken) {
      setAuthStatus(false)
      setAccount({} as Account)
      return
    }

    localStorage.setItem('access_token', accessToken)
    sendFetchAccount(gqlContext)
  }, [accessToken])

  useEffect(() => {
    if (!refreshToken) return

    localStorage.setItem('refresh_token', refreshToken)
  }, [refreshToken])

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        account,
        setAccessToken,
        setRefreshToken,
        fetchAccount: sendFetchAccount,
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
    fetchAccount,
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

  return {
    loading: registering || logginIn,
    authenticated,
    account,
    register: (input: RegisterInput) => sendRegister({ variables: { input } }),
    openRegisterPopup: () => dispatch({ type: 'OPEN_REGISTER_POPUP' }),
    login: (input: LoginInput) => sendLogin({ variables: { input } }),
    openLoginPopup: () => dispatch({ type: 'OPEN_LOGIN_POPUP' }),
    logout() {
      setAccessToken('')
      setRefreshToken('')
    },
    refreshAccount: () => {
      authenticated && fetchAccount()
    },
    gqlContext,
  }
}
