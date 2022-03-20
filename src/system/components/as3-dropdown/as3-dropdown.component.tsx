import { Fragment, MouseEventHandler } from 'react'
import { Dropdown, DropdownProps } from 'react-bootstrap'
import Icon from '@mdi/react'

import './as3-dropdown.style.scss'
import { AlignType } from 'react-bootstrap/esm/types'

type AS3DropdownProps = DropdownProps & {
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

  prefixIcon?: string
  suffixIcon?: string
  align?: AlignType
  className?: string

  items: {
    prefixIcon?: string
    text: string
    onClick?: MouseEventHandler<HTMLElement>
    separate?: boolean
  }[]
}

export function AS3Dropdown(props: AS3DropdownProps) {
  return (
    <Dropdown className={`as3-dropdown ${props.className}`}>
      <Dropdown.Toggle
        className="px-0 rounded-0"
        variant={props.variant ?? 'default'}
      >
        {props.prefixIcon && (
          <Icon
            className="me-1"
            path={props.prefixIcon}
            size={0.8} />
        )}
        {props.children}
        {props.suffixIcon && (
          <Icon
            className="ms-1"
            path={props.suffixIcon}
            size={0.8} />
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="py-0"
        align={props.align ?? 'end'}>
        {props.items.map((itemProps, i) => {
          const $element = (
            <Dropdown.Item
              key={i}
              className="py-2"
              onClick={itemProps.onClick}>
              {itemProps.prefixIcon && (
                <Icon
                  className="me-3"
                  path={itemProps.prefixIcon}
                  size={1} />
              )}
              {itemProps.text}
            </Dropdown.Item>
          )

          return itemProps.separate ? (
            <Fragment key={`${i}_separator`}>
              <Dropdown.Divider className="my-0" />
              {$element}
            </Fragment>
          ) : (
            $element
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}
