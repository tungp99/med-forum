import { mdiPencilOutline } from '@mdi/js'
import { AS3Button } from 'system/components'

export function EditButtonComponent() {
  return (
    <AS3Button
      className="btn-edit"
      icon={mdiPencilOutline}
      iconSize={1.1}
      text
    ></AS3Button>
  )
}
