import { Button, ButtonProps } from 'react-bootstrap'

import './as3-button.style.scss'
import Icon from '@mdi/react'

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
    | 'outline-light'
    | 'outline-dark'

  icon?: string
  iconSize?: string | number

  text?: boolean

  routerLink?: boolean
  routerLinkPath?: string
}

export function AS3Button(props: AS3ButtonProps) {
  const classList = ['as3-button']
  props.className && classList.push(props.className)
  props.text && classList.push('text')

  return (
    <Button
      className={classList.join(' ')}
      variant={props.variant ?? 'default'}
      type={props.type}
      size={props.size}
      active={props.active}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.icon && (
        <Icon
          className={props.text && props.children ? 'me-2' : ''}
          path={props.icon}
          size={props.iconSize ?? 1}
        />
      )}

      {props.children}
    </Button>
  )
}
