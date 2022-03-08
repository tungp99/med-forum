import {
  FloatingLabel,
  Form,
  FormControlProps,
  InputGroup,
} from 'react-bootstrap'
import Icon from '@mdi/react'

import './as3-input.style.scss'
import { forwardRef } from 'react'

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

  width?: number

  label?: string

  prefixIcon?: string
  suffixIcon?: string

  errors?: string[]
}

export const AS3Input = forwardRef<HTMLInputElement, AS3InputProps>(
  (props, ref) => {
    const classList = ['as3-input']
    props.className && classList.push(props.className)

    return (
      <Form.Group
        className={classList.join(' ')}
        style={{ width: props.width }}
      >
        <InputGroup size={props.size}>
          {props.prefixIcon && (
            <InputGroup.Text className="pe-0">
              <Icon
                path={props.prefixIcon}
                size={1} />
            </InputGroup.Text>
          )}

          {props.label ? (
            <FloatingLabel label={props.label}>
              <Form.Control
                ref={ref}
                type={props.type ?? 'text'}
                placeholder={props.placeholder ?? ''}
                value={props.value}
                onChange={props.onChange}
              />
            </FloatingLabel>
          ) : (
            <Form.Control
              type={props.type ?? 'text'}
              placeholder={props.placeholder ?? ''}
              value={props.value}
              onChange={props.onChange}
            />
          )}

          {props.suffixIcon && (
            <InputGroup.Text className="ps-0">
              <Icon
                path={props.suffixIcon}
                size={1} />
            </InputGroup.Text>
          )}
        </InputGroup>

        {props.errors &&
          props.errors.map((item, i) => (
            <Form.Text
              className="text-danger"
              key={i}>
              {item}
            </Form.Text>
          ))}
      </Form.Group>
    )
  }
)
