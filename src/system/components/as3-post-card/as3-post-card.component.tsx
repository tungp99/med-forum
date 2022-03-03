import { Card, CardProps } from 'react-bootstrap'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import {
  faFlag,
  faMessage,
  faBookmark,
} from '@fortawesome/free-regular-svg-icons'

import { AS3Button } from '../as3-button/as3-button.component'
import { AS3Spacer } from '../as3-spacer.component'

import './as3-post-card.style.scss'
import { AS3Link } from '../as3-link/as3-link.component'
import { CommentsComponent } from './comments.component'

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
            icon={faAngleUp}
            text />
          <span className="card-subtitle">34k</span>
          <AS3Button
            className="px-1"
            icon={faAngleDown}
            text />
        </Card.Body>

        <Card.Body className="as3-post-card-main">
          <Card.Subtitle>
            <span className="category">as3/category</span>
            <span className="separator mx-1">•</span>
            <span className="publish">posted by drjohnsmith 17 hours ago</span>

            <AS3Spacer />

            <AS3Link
              iconSize="sm"
              icon={faFlag}>
              Report
            </AS3Link>
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
              icon={faMessage}
              iconSize="sm">
              7k Comments
            </AS3Button>

            <AS3Button
              text
              size="sm"
              icon={faBookmark}
              iconSize="sm">
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
