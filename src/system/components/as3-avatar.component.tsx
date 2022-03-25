import { ImageProps } from 'react-bootstrap'
import './as3-avatar.style.scss'

type AS3AvatarProps = ImageProps

export function AS3Avatar(props: AS3AvatarProps) {
  const classList = ['as3-avatar', 'mb-0']
  props.className && classList.push(props.className)

  return (
    <div
      className={classList.join(' ')}
      style={{
        width: props.width ?? 32,
        height: props.height ?? 32,
      }}
    >
      <div
        className="as3-avatar-img rounded-circle"
        style={{
          backgroundImage: `url(${
            props.src ?? 'https://via.placeholder.com/128.jpg'
          })`,
        }}
      ></div>
      {props.children}
    </div>
  )
}
