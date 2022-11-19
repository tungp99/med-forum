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
  home?: boolean
  controlled?: boolean

  items: {
    prefixIcon?: string
    element: JSX.Element | string
    onClick?: MouseEventHandler<HTMLElement>
    separate?: boolean
  }[]
}

export function AS3Dropdown({
  className,
  show,
  controlled,
  prefixIcon,
  suffixIcon,
  align,
  variant,
  children,
  items,
}: AS3DropdownProps) {
  const classList = ['as3-dropdown']
  className && classList.push(className)

  return (
    <Dropdown
      className={classList.join(' ')}
      show={show}>
      {!controlled ? (
        <Dropdown.Toggle
          className={'px-0 rounded-0'}
          variant={variant ?? 'default'}
        >
          {prefixIcon && <Icon
            className="me-1"
            path={prefixIcon}
            size={0.8} />}
          {children}
          {suffixIcon && <Icon
            className="ms-1"
            path={suffixIcon}
            size={0.8} />}
        </Dropdown.Toggle>
      ) : (
        children
      )}

      <Dropdown.Menu
        className="py-0 w-100"
        align={align ?? 'end'}>
        {items.map((itemProps, i) => {
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
              {itemProps.element}
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
