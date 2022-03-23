import Icon from '@mdi/react'
import {
  FloatingLabel,
  Form,
  FormSelectProps,
  InputGroup,
} from 'react-bootstrap'

type AS3SelectProps = FormSelectProps & {
  label?: string

  disabled?: boolean
  readOnly?: boolean

  width?: number

  prefixIcon?: string
  suffixIcon?: string

  items: { text: string; value: string }[]
  errors?: string[]
}

export function AS3Select({
  className,
  label,
  disabled,
  width,
  size,
  prefixIcon,
  suffixIcon,
  onChange,
  onKeyUp,
  items,
  errors,
  value,
}: AS3SelectProps) {
  const classList = ['as3-input']
  className && classList.push(className)

  const options = items.map(({ text, value }, i) => (
    <option
      key={i}
      value={value}>
      {text}
    </option>
  ))

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
            <Form.Select
              disabled={disabled}
              value={value}
              onChange={onChange}
              onKeyUp={onKeyUp}
            >
              {options}
            </Form.Select>
          </FloatingLabel>
        ) : (
          <Form.Select
            disabled={disabled}
            value={value}
            onChange={onChange}
            onKeyUp={onKeyUp}
          >
            {options}
          </Form.Select>
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
            className="text-danger"
            key={i}>
            {item}
          </Form.Text>
        ))}
    </Form.Group>
  )
}
