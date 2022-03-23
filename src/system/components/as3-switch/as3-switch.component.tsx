import { Form, FormCheckProps } from 'react-bootstrap'
import Icon from '@mdi/react'

import './as3-switch.style.scss'

type AS3SwitchProps = FormCheckProps & {
  label?: string

  prefixIcon?: string
  suffixIcon?: string

  iconSize?: number
}

export function AS3Switch({
  className,
  prefixIcon,
  suffixIcon,
  iconSize,
  label,
  checked,
  onChange,
}: AS3SwitchProps) {
  const classList = ['as3-switch']
  className && classList.push(className)

  return (
    <>
      {prefixIcon && (
        <Icon
          path={prefixIcon}
          size={iconSize ?? 0.8}
          className="me-1" />
      )}
      <Form.Check
        type="switch"
        className={classList.join(' ')}
        inline
        label={label}
        checked={checked}
        onChange={onChange}
      />
      {suffixIcon && (
        <Icon
          path={suffixIcon}
          size={iconSize ?? 0.8}
          className="ms-1" />
      )}
    </>
  )
}
