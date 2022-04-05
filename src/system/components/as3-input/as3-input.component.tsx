import {
  FloatingLabel,
  Form,
  FormControlProps,
  InputGroup,
} from 'react-bootstrap'
import Icon from '@mdi/react'

import './as3-input.style.scss'

type AS3InputProps = FormControlProps & {
  type?:
    | 'text'
    | 'password'
    | 'datetime'
    | 'date'
    | 'month'
    | 'time'
    | 'week'
    | 'number'
    | 'email'
    | 'url'
    | 'search'
    | 'tel'
    | 'color'

  label?: string

  disabled?: boolean
  readOnly?: boolean

  width?: number

  prefixIcon?: string
  suffixIcon?: string

  errors?: string[]
}

export function AS3Input({
  className,
  type,
  label,
  placeholder,
  value,
  size,
  prefixIcon,
  suffixIcon,
  disabled,
  readOnly,
  width,
  errors,
  onChange,
  onKeyUp,
}: AS3InputProps) {
  const classList = ['as3-input']
  className && classList.push(className)

  return (
    <Form.Group
      className={classList.join(' ')}
      style={{ width: width }}>
      <InputGroup size={size}>
        {prefixIcon && (
          <InputGroup.Text className="pe-0 as3-input-icon-prefix">
            <Icon
              path={prefixIcon}
              size={1} />
          </InputGroup.Text>
        )}

        {label ? (
          <FloatingLabel label={label}>
            <Form.Control
              type={type ?? 'text'}
              readOnly={readOnly}
              disabled={disabled}
              placeholder={placeholder ?? ''}
              value={value}
              onChange={onChange}
              onKeyUp={onKeyUp}
            />
          </FloatingLabel>
        ) : (
          <Form.Control
            type={type ?? 'text'}
            readOnly={readOnly}
            disabled={disabled}
            placeholder={placeholder ?? ''}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
          />
        )}

        {suffixIcon && (
          <InputGroup.Text className="ps-0 as3-input-icon-suffix">
            <Icon
              path={suffixIcon}
              size={1} />
          </InputGroup.Text>
        )}
      </InputGroup>

      {errors &&
        errors.map((item, i) => (
          <Form.Text
            className="text-danger d-block"
            key={i}>
            {item}
          </Form.Text>
        ))}
    </Form.Group>
  )
}
