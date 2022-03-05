import { mdiPlus } from '@mdi/js'
import { AS3Button } from 'system/components'

export function AddButtonComponent() {
  return (
    <AS3Button
      className="btn-edit"
      icon={mdiPlus}
      iconSize={1.1}
      text
    ></AS3Button>
  )
}
