import { mdiPencilOutline } from '@mdi/js'
import { AS3Button } from 'system/components'

type EditButtonComponentProps = {
  onClick?: () => void
}

export function EditButtonComponent({ onClick }: EditButtonComponentProps) {
  return (
    <AS3Button
      className="btn-edit"
      icon={mdiPencilOutline}
      iconSize={1.1}
      text
      onClick={onClick}
    ></AS3Button>
  )
}
