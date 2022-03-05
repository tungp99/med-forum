import { Figure, ImageProps } from 'react-bootstrap'

type AS3AvatarProps = ImageProps

export function AS3Avatar(props: AS3AvatarProps) {
  const classList = ['as3-avatar', 'mb-0']
  props.className && classList.push(...props.className.split(' '))

  return (
    <Figure className={classList.join(' ')}>
      <Figure.Image
        width={props.width ?? 32}
        height={props.height ?? 32}
        className="rounded-circle mb-0"
        src="https://via.placeholder.com/128.jpg"
      />
    </Figure>
  )
}
