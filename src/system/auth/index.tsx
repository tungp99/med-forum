/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation } from '@apollo/client'
import {
  ComponentPropsWithoutRef,
  createContext,
  Dispatch,
  useContext,
  useState,
} from 'react'

import {
  Login,
  LoginInput,
  Register,
  RegisterInput,
} from 'system/generated/gql.types'
import { Account } from 'system/types'
import { Toast, useDispatch } from 'system/store'
import { LOGIN_MUTATION, REGISTRATION_MUTATION } from './gql.mutations'

type AuthContextType = {
  authenticated: boolean
  setAuthStatus: Dispatch<React.SetStateAction<boolean>>
  account?: Account
  setAccount: Dispatch<React.SetStateAction<Account | undefined>>
  accessToken: string
  setAccessToken: Dispatch<React.SetStateAction<string>>
  refreshToken: string
  setRefreshToken: Dispatch<React.SetStateAction<string>>
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  setAuthStatus: () => {},
  account: undefined,
  setAccount: () => {},
  accessToken: '',
  setAccessToken: () => {},
  refreshToken: '',
  setRefreshToken: () => {},
})

export function AuthProvider(props: ComponentPropsWithoutRef<'div'>) {
  const [authenticated, setAuthStatus] = useState(false)
  const [account, setAccount] = useState<Account | undefined>()
  const [accessToken, setAccessToken] = useState('')
  const [refreshToken, setRefreshToken] = useState('')

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthStatus,
        account,
        setAccount,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const {
    authenticated,
    setAuthStatus,
    account,
    setAccount,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  } = useContext(AuthContext)
  const dispatch = useDispatch()

  const [sendRegister, { loading: regLoading }] = useMutation<Register>(
    REGISTRATION_MUTATION,
    {
      onCompleted: data => {
        const { register: response } = data
        setAuthStatus(true)
        setAccount({ ...response.account })
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        dispatch({ type: 'CLOSE_REGISTER_POPUP' })
      },
      onError: err => Toast.error({ title: err.name, content: err.message }),
    }
  )

  const [sendLogin, { loading: loginLoading }] = useMutation<Login>(
    LOGIN_MUTATION,
    {
      onCompleted: data => {
        const { login: response } = data
        setAuthStatus(true)
        setAccount({ ...response.account })
        setAccessToken(response.accessToken)
        setRefreshToken(response.refreshToken)
        dispatch({ type: 'CLOSE_LOGIN_POPUP' })
      },
      onError: err => Toast.error({ title: err.name, content: err.message }),
    }
  )

  return {
    loading: regLoading || loginLoading,
    authenticated,
    account,
    accessToken,
    refreshToken,
    register: (input: RegisterInput) => sendRegister({ variables: { input } }),
    openRegisterPopup: () => dispatch({ type: 'OPEN_REGISTER_POPUP' }),
    login: (input: LoginInput) => sendLogin({ variables: { input } }),
    openLoginPopup: () => dispatch({ type: 'OPEN_LOGIN_POPUP' }),
    logout() {
      setAuthStatus(false)
      setAccount(undefined)
      setAccessToken('')
      setRefreshToken('')
    },
  }
}
