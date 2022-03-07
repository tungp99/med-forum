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

export function AS3Chip(props: AS3ChipProps) {
  const classList = ['as3-chip']
  props.className && classList.push(props.className)

  return (
    <Button
      className={classList.join(' ')}
      size={props.size}
      variant={props.variant ?? 'light'}
      onClick={props.onClick}
    >
      {props.icon && (
        <Icon
          className={props.children ? 'me-1' : ''}
          path={props.icon}
          size={props.iconSize ?? 1}
        />
      )}

      {props.children}
    </Button>
  )
}
