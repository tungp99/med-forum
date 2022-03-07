import { Fragment, MouseEventHandler } from 'react'
import { Dropdown, DropdownProps } from 'react-bootstrap'
import Icon from '@mdi/react'

import './as3-dropdown.style.scss'

type AS3DropdownProps = DropdownProps & {
  prefixIcon?: string
  suffixIcon?: string

  items: {
    prefixIcon?: string
    text: string
    onClick?: MouseEventHandler<HTMLElement>
    separate?: boolean
  }[]
}

export function AS3Dropdown(props: AS3DropdownProps) {
  return (
    <Dropdown className="as3-dropdown">
      <Dropdown.Toggle
        variant="default"
        className="px-0">
        {props.prefixIcon && <Icon
          className="me-1"
          path={props.prefixIcon} />}
        {props.children}
        {props.suffixIcon && <Icon
          className="ms-1"
          path={props.suffixIcon} />}
      </Dropdown.Toggle>

      <Dropdown.Menu
        className="py-0"
        align="end">
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
