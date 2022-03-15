import { useState } from 'react'
import { DateTime } from 'luxon'
import { Card, CardProps, Stack } from 'react-bootstrap'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiBookmarkOutline,
  mdiFlagOutline,
  mdiMessageOutline,
  mdiPencilOutline,
} from '@mdi/js'

import { Post } from 'system/types'
import { AS3Button, AS3Spacer, AS3Link, AS3Editor } from 'system/components'
import { CommentsComponent } from './comments.component'
import { AS3PostForm } from './as3-post-form.component'

import './as3-post-card.style.scss'

type AS3PostCardProps = CardProps & {
  data: Post
  preview?: boolean
  editable?: boolean
}

export function AS3PostCard({
  className,
  data,
  preview,
  editable,
  onClick,
}: AS3PostCardProps) {
  const classList = ['as3-post-card']
  className && classList.push(className)

  const [state, setState] = useState({ editing: false })
  const { editing } = state

  const {
    title,
    markdownContent,
    commentsCount,
    comments,
    createdAt,
    creatorAccount,
  } = data

  return editing ? (
    <AS3PostForm
      data={data}
      onSave={data => {
        setState({ ...state, editing: false })
        console.log(data)
      }}
    />
  ) : (
    <Card
      className={classList.join(' ')}
      onClick={onClick}>
      <div className="d-flex flex-row">
        <Card.Body className="as3-post-card-prefix p-2">
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

        <Card.Body className="as3-post-card-main p-0">
          <Card.Subtitle className="px-2 pt-2 pb-0">
            <span className="category">as3/category</span>
            <span className="separator mx-1">•</span>
            <span className="publish">
              posted by {creatorAccount?.username} &nbsp;
              {DateTime.fromISO(createdAt).toLocaleString(
                DateTime.DATETIME_SHORT
              )}
            </span>

            <AS3Spacer />

            <Stack
              direction="horizontal"
              gap={3}>
              {editable && (
                <AS3Link
                  icon={mdiPencilOutline}
                  onClick={() => setState({ ...state, editing: true })}
                />
              )}
              <AS3Link icon={mdiFlagOutline}>Report</AS3Link>
            </Stack>
          </Card.Subtitle>

          <Card.Title className="px-2 pt-2 pb-0">{title}</Card.Title>

          {!preview && (
            <AS3Editor
              preview
              value={markdownContent}
              height="auto" />
          )}

          <Card.Footer className="px-2 d-flex">
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
