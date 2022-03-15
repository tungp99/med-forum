import { Button, ButtonProps } from 'react-bootstrap'
import Icon from '@mdi/react'
import { mdiLoading } from '@mdi/js'

import './as3-button.style.scss'

type AS3ButtonProps = ButtonProps & {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'light'
    | 'dark'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-warning'
    | 'outline-danger'
    | 'outline-info'
    | 'outline-dark'
  loading?: boolean
  text?: boolean
  icon?: string
  iconSize?: string | number
}

export function AS3Button({
  className,
  children,
  type,
  size,
  active,
  disabled,
  variant,
  loading,
  text,
  icon,
  iconSize,
  onClick,
}: AS3ButtonProps) {
  const classList = ['as3-button']
  className && classList.push(className)
  text && classList.push('text')

  return (
    <Button
      className={classList.join(' ')}
      variant={variant ?? 'default'}
      type={type}
      size={size}
      active={active}
      disabled={disabled}
      onClick={onClick}
    >
      {icon && !loading && (
        <Icon
          className={text && children ? 'me-1' : ''}
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
    </Button>
  )
}
