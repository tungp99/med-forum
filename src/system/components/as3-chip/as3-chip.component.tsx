import { Button, ButtonProps } from 'react-bootstrap'
import Icon from '@mdi/react'

import './as3-chip.style.scss'

type AS3ChipProps = ButtonProps & {
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
    | 'outline-light'
    | 'outline-dark'

  icon?: string
  iconSize?: string | number
}

export function AS3Chip({
  children,
  className,
  active,
  size,
  variant,
  icon,
  iconSize,
  onClick,
}: AS3ChipProps) {
  const classList = ['as3-chip']
  className && classList.push(className)

  return (
    <Button
      className={classList.join(' ')}
      active={active}
      size={size}
      variant={variant ?? 'light'}
      onClick={onClick}
    >
      {icon && (
        <Icon
          className={children ? 'me-1' : ''}
          path={icon}
          size={iconSize ?? 1}
        />
      )}

      {children}
    </Button>
  )
}
