import {
  FloatingLabel,
  Form,
  FormControlProps,
  InputGroup,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

import './as3-input.style.scss'

type AS3InputProps = FormControlProps & {
  type?:
    | 'text'
    | 'password'
    | 'datetime'
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

  prefixIcon?: IconDefinition
  suffixIcon?: IconDefinition

  errors?: string[]
}

export function AS3Input(props: AS3InputProps) {
  const classList = ['as3-input']
  props.className && classList.push(...props.className.split(' '))

  return (
    <Form.Group
      className={classList.join(' ')}
      style={{ width: props.width }}>
      <InputGroup size={props.size}>
        {props.prefixIcon && (
          <InputGroup.Text className="pe-0">
            <FontAwesomeIcon
              icon={props.prefixIcon}
              size="lg" />
          </InputGroup.Text>
        )}

        {props.label ? (
          <FloatingLabel label={props.label}>
            <Form.Control
              type={props.type ?? 'text'}
              placeholder={props.placeholder ?? ''}
              value={props.value}
            />
          </FloatingLabel>
        ) : (
          <Form.Control
            type={props.type ?? 'text'}
            placeholder={props.placeholder ?? ''}
            value={props.value}
          />
        )}

        {props.suffixIcon && (
          <InputGroup.Text className="ps-0">
            <FontAwesomeIcon
              icon={props.suffixIcon}
              size="lg" />
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
