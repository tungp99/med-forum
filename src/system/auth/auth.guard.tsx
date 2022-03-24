import { useAuth } from '.'

type GuardedComponentProps = {
  children: JSX.Element
  requireGod?: boolean
}

export function GuardedComponent({
  children,
  requireGod,
}: GuardedComponentProps): JSX.Element {
  const { authenticated } = useAuth()

  if (!authenticated || requireGod) {
    return <>403 Nope</>
  }

  return children
}
