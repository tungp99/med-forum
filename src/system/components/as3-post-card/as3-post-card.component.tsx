import { DateTime } from 'luxon'
import { Card, CardProps } from 'react-bootstrap'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiBookmarkOutline,
  mdiFlagOutline,
  mdiMessageOutline,
} from '@mdi/js'

import { Post } from 'system/types'
import { AS3Button, AS3Spacer, AS3Link, AS3Editor } from 'system/components'
import { CommentsComponent } from './comments.component'

import './as3-post-card.style.scss'

type AS3PostCardProps = CardProps & {
  data: Post
}

export function AS3PostCard({
  className,
  data: {
    title,
    markdownContent,
    commentsCount,
    comments,
    createdAt,
    creatorAccount,
  },
  onClick,
}: AS3PostCardProps) {
  const classList = ['as3-post-card horizontal']
  className && classList.push(className)

  return (
    <Card
      className={classList.join(' ')}
      onClick={onClick}>
      <div className="d-flex flex-row">
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

        <Card.Body className="as3-post-card-main">
          <Card.Subtitle>
            <span className="category">as3/category</span>
            <span className="separator mx-1">•</span>
            <span className="publish">
              posted by {creatorAccount?.username} &nbsp;
              {DateTime.fromISO(createdAt).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </span>

            <AS3Spacer />

            <AS3Link icon={mdiFlagOutline}>Report</AS3Link>
          </Card.Subtitle>

          <Card.Title>{title}</Card.Title>

          <AS3Editor
            preview
            value={markdownContent}
            height="auto" />

          <Card.Footer>
            <AS3Button
              text
              size="sm"
              icon={mdiMessageOutline}>
              {commentsCount} Comments
            </AS3Button>

            <AS3Button
              text
              size="sm"
              icon={mdiBookmarkOutline}>
              Collect
            </AS3Button>
          </Card.Footer>
        </Card.Body>
      </div>

      {comments && comments.length > 0 && (
        <Card.Body className="as3-post-card-extension">
          <CommentsComponent data={comments} />
        </Card.Body>
      )}
    </Card>
  )
}
