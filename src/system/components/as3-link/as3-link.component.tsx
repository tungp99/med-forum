import Icon from '@mdi/react'

import './as3-link.style.scss'

type AS3LinkProps = React.ComponentPropsWithoutRef<'a'> & {
  icon?: string
  iconSize?: string | number
}

export function AS3Link(props: AS3LinkProps) {
  const classList = ['as3-link']
  props.className && classList.push(props.className)

  return (
    <a
      className={classList.join(' ')}
      onClick={props.onClick}>
      {props.icon && (
        <Icon
          className={props.children ? 'me-1' : ''}
          path={props.icon}
          size={props.iconSize ?? 1}
        />
      )}
      {props.children}
    </a>
  )
}
