import { useAuth } from '.'

type GuardedComponentProps = {
  children: JSX.Element
}

export function GuardedComponent({
  children,
}: GuardedComponentProps): JSX.Element {
  const { authenticated } = useAuth()

  if (!authenticated) {
    return <>nope</>
  }
  return children
}
