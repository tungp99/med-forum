import { Button, ButtonProps } from 'react-bootstrap'
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  icon?: IconDefinition
  iconSize?: SizeProp
}

export function AS3Chip(props: AS3ChipProps) {
  const classList = ['as3-chip']
  props.className && classList.push(...props.className.split(' '))

  return (
    <Button
      className={classList.join(' ')}
      size={props.size}
      variant={props.variant ?? 'light'}
      onClick={props.onClick}
    >
      {props.icon && (
        <FontAwesomeIcon
          className={props.children ? 'me-2' : ''}
          icon={props.icon}
          size={props.iconSize}
        />
      )}

      {props.children}
    </Button>
  )
}
