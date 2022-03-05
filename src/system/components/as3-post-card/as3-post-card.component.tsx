import { Card, CardProps } from 'react-bootstrap'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiBookmarkOutline,
  mdiFlagOutline,
  mdiMessageOutline,
} from '@mdi/js'

import { AS3Button, AS3Spacer, AS3Link } from 'system/components'
import { CommentsComponent } from './comments.component'

import './as3-post-card.style.scss'

type AS3PostCardProps = CardProps

export function AS3PostCard(props: AS3PostCardProps) {
  const hasExtension = true

  return (
    <Card
      className="as3-post-card horizontal"
      onClick={props.onClick}>
      <div className="d-flex flex-row">
        <Card.Body className="as3-post-card-prefix">
          <AS3Button
            className="px-1"
            icon={mdiArrowUpBoldOutline}
            text />
          <span className="card-subtitle">34k</span>
          <AS3Button
            className="px-1"
            icon={mdiArrowDownBoldOutline}
            text />
        </Card.Body>

        <Card.Body className="as3-post-card-main">
          <Card.Subtitle>
            <span className="category">as3/category</span>
            <span className="separator mx-1">•</span>
            <span className="publish">posted by drjohnsmith 17 hours ago</span>

            <AS3Spacer />

            <AS3Link icon={mdiFlagOutline}>Report</AS3Link>
          </Card.Subtitle>

          <Card.Title>
            viverra mauris in aliquam sem fringilla ut morbi
          </Card.Title>

          <Card.Img
            variant="bottom"
            src="https://via.placeholder.com/640x430.jpg"
            className="rounded-0"
          />

          <Card.Footer>
            <AS3Button
              text
              size="sm"
              icon={mdiMessageOutline}>
              7k Comments
            </AS3Button>

            <AS3Button
              text
              size="sm"
              icon={mdiBookmarkOutline}>
              Save
            </AS3Button>
          </Card.Footer>
        </Card.Body>
      </div>

      {hasExtension && (
        <Card.Body className="as3-post-card-extension">
          <CommentsComponent />
        </Card.Body>
      )}
    </Card>
  )
}
