import { useAuth } from '.'

type GuardedComponentProps = {
  children: JSX.Element
  requireGod?: boolean
}

export function GuardedComponent({
  children,
  requireGod,
}: GuardedComponentProps): JSX.Element {
  const { authenticated, hasFullAccess } = useAuth()

  if (!authenticated) return <span>401 Nope</span>

  if (requireGod && !hasFullAccess()) return <span>403 Nope</span>

  return children
}
