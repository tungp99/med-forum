import { useRef } from 'react'
import { Figure, ImageProps } from 'react-bootstrap'
import { Toast } from 'system/store'

type AS3AvatarProps = ImageProps

export function AS3Avatar(props: AS3AvatarProps) {
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const classList = ['as3-avatar', 'mb-0']
  props.className && classList.push(props.className)

  return (
    <Figure className={classList.join(' ')}>
      <Figure.Image
        width={props.width ?? 32}
        height={props.height ?? 32}
        className="rounded-circle mb-0"
        src="https://via.placeholder.com/128.jpg"
        onClick={() => {
          avatarInputRef.current?.click()
        }}
      />
      {props.children}
      <input
        ref={avatarInputRef}
        type="file"
        className="d-none"
        accept="image/*"
        onChange={e => {
          if (e.target.type.startsWith('image/')) console.log(e.target.files)
          else Toast.error({ title: '', content: 'Inappropriate file type' })
        }}
      />
    </Figure>
  )
}
