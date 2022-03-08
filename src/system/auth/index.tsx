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
import { useDispatch } from 'system/store'
import { LOGIN_MUTATION, REGISTRATION_MUTATION } from './gql.mutations'

type AuthContextType = {
  authenticated: boolean
  setAuthStatus: Dispatch<React.SetStateAction<boolean>>
  account?: Partial<Account>
  setAccount: Dispatch<React.SetStateAction<Partial<Account> | undefined>>
}

const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  setAuthStatus: () => {},
  account: undefined,
  setAccount: () => {},
})

export function AuthProvider(props: ComponentPropsWithoutRef<'div'>) {
  const [authenticated, setAuthStatus] = useState(false)
  const [account, setAccount] = useState<Partial<Account> | undefined>()

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        setAuthStatus,
        account,
        setAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const { authenticated, setAuthStatus, account, setAccount } =
    useContext(AuthContext)
  const dispatch = useDispatch()

  const [sendRegister, { loading: regLoading }] = useMutation<Register>(
    REGISTRATION_MUTATION,
    {
      onCompleted: data => {
        console.log(data)
        setAuthStatus(true)
        setAccount({ ...data.register.account })
        dispatch({ type: 'CLOSE_REGISTER_POPUP' })
      },
      onError: err => {
        console.error(err)
        dispatch({
          type: 'TOAST_ERROR',
          payload: { title: err.name, content: err.message },
        })
      },
    }
  )

  const [sendLogin, { loading: loginLoading }] = useMutation<Login>(
    LOGIN_MUTATION,
    {
      onCompleted: data => {
        console.log(data)
        setAuthStatus(true)
        setAccount({ ...data.login.account })
        dispatch({ type: 'CLOSE_LOGIN_POPUP' })
      },
      onError: err => {
        console.error(err)
        dispatch({
          type: 'TOAST_ERROR',
          payload: { title: err.name, content: err.message },
        })
      },
    }
  )

  return {
    loading: regLoading || loginLoading,
    authenticated,
    account,
    register: (input: RegisterInput) => sendRegister({ variables: { input } }),
    openRegisterPopup: () => dispatch({ type: 'OPEN_REGISTER_POPUP' }),
    login: (input: LoginInput) => sendLogin({ variables: { input } }),
    openLoginPopup: () => dispatch({ type: 'OPEN_LOGIN_POPUP' }),
    logout() {
      setAuthStatus(false)
      setAccount(undefined)
    },
  }
}
