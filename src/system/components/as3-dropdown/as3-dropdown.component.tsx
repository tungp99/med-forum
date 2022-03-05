import Icon from '@mdi/react'
import { MouseEventHandler } from 'react'
import { Dropdown, DropdownProps } from 'react-bootstrap'

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
          className="me-2"
          path={props.prefixIcon} />}
        {props.children}
        {props.suffixIcon && <Icon
          className="ms-2"
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
            <>
              <Dropdown.Divider className="my-0" />
              {$element}
            </>
          ) : (
            $element
          )
        })}
      </Dropdown.Menu>
    </Dropdown>
  )
}
