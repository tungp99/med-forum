import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

import './as3-link.style.scss'

type AS3LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  disabled?: boolean
  loading?: boolean
  icon?: string
  iconSize?: string | number
}

export function AS3Link({
  children,
  className,
  disabled,
  loading,
  icon,
  iconSize,
  onClick,
}: AS3LinkProps) {
  const classList = ['as3-link']
  className && classList.push(className)

  return (
    <a
      className={classList.join(' ')}
      onClick={loading || disabled ? () => false : onClick}
    >
      {icon && !loading && (
        <Icon
          className={children ? 'me-1' : ''}
          path={icon}
          size={iconSize ?? 1}
        />
      )}
      {loading ? (
        <Icon
          path={mdiLoading}
          size={iconSize ?? 1}
          spin />
      ) : (
        children
      )}
    </a>
  )
}
