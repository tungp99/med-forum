import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './as3-link.style.scss'

type AS3LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  icon?: IconDefinition
  iconSize?: SizeProp
}

export function AS3Link(props: AS3LinkProps) {
  const classList = ['as3-link']
  props.className && classList.push(...props.className.split(' '))

  return (
    <a
      className={classList.join(' ')}
      onClick={props.onClick}>
      {props.icon && (
        <FontAwesomeIcon
          size={props.iconSize}
          icon={props.icon}
          className={props.children ? 'me-2' : ''}
        />
      )}
      {props.children}
    </a>
  )
}
