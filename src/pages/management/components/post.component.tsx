import { mdiArrowDownBoldOutline, mdiArrowUpBoldOutline } from '@mdi/js'
import { Card } from 'react-bootstrap'
import { AS3Button, AS3Chip } from 'system/components'
export function Post() {
  return (
    <>
      <Card>
        <Card.Body className="as3-post-card-main">
          <Card.Body className="as3-post-card-prefix">
            <AS3Button
              className="px-1"
              icon={mdiArrowUpBoldOutline}
              size="sm"
              iconSize={0.8}
              text
            />
            <span className="card-subtitle">34k</span>
            <AS3Button
              className="px-1"
              icon={mdiArrowDownBoldOutline}
              size="sm"
              iconSize={0.8}
              text
            />
          </Card.Body>
        </Card.Body>
      </Card>
    </>
  )
}
