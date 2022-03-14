import { DateTime } from 'luxon'
import { useQuery } from '@apollo/client'
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
import { GET_COMMENTS_QUERY } from './gql'
import { GetComments } from 'system/generated/gql.types'

type AS3PostCardProps = CardProps & {
  data: Post
}

export function AS3PostCard({ onClick, data }: AS3PostCardProps) {
  const { data: fetchCommentsResponse } = useQuery<GetComments>(
    GET_COMMENTS_QUERY,
    {
      variables: {
        postId: data.id,
        skip: 0,
      },
    }
  )

  return (
    <Card
      className="as3-post-card horizontal"
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
              posted by drjohnsmith &nbsp;
              {DateTime.fromISO(data.createdAt).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </span>

            <AS3Spacer />

            <AS3Link icon={mdiFlagOutline}>Report</AS3Link>
          </Card.Subtitle>

          <Card.Title>{data.title}</Card.Title>

          <AS3Editor
            preview
            value={data.markdownContent}
            height="auto" />

          <Card.Footer>
            <AS3Button
              text
              size="sm"
              icon={mdiMessageOutline}>
              {data.commentsCount} Comments
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

      {fetchCommentsResponse?.comments && (
        <Card.Body className="as3-post-card-extension">
          <CommentsComponent />
        </Card.Body>
      )}
    </Card>
  )
}
