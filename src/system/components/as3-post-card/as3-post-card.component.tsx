import { useMemo, useState } from 'react'
import { DateTime } from 'luxon'
import { useNavigate } from 'react-router-dom'
import { Card, CardProps, Stack } from 'react-bootstrap'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiBookmark,
  mdiBookmarkOutline,
  mdiMessageOutline,
  mdiPencilOutline,
} from '@mdi/js'

import { Post } from 'system/types'
import { useAuth } from 'system/auth'
import { AS3Button, AS3Spacer, AS3Editor } from 'system/components'
import { CommentsComponent } from './comments.component'
import { AS3PostForm } from './as3-post-form.component'
import { ReplyInputComponent } from './reply-input.component'
import {
  CreatePostInput,
  PostRate,
  Quality,
  UpdatePostInput,
} from 'system/generated/gql.types'

import './as3-post-card.style.scss'
import { useMutation } from '@apollo/client'
import { Toast, useDispatch } from 'system/store'
import { UPDATE_POST_RATE_MUTATION } from './gql'
import { AS3Link } from '../as3-link/as3-link.component'
import { useCollector } from 'system/plugins'

type AS3PostCardProps = CardProps & {
  data: Post
  preview?: boolean
  editable?: boolean

  afterEdit?: (data: CreatePostInput | UpdatePostInput) => void
}

export function AS3PostCard({
  className,
  data,
  preview,
  editable,

  afterEdit,
}: AS3PostCardProps) {
  const classList = ['as3-post-card']
  className && classList.push(className)

  const {
    id,
    title,
    markdownContent,
    comments,
    commentsCount,
    createdAt,
    creatorAccount,
    score,
  } = data

  const { isCollected, addPostId, deletePostId, collection } = useCollector()
  const collected = useMemo(() => isCollected(id), [collection])
  const dispatch = useDispatch()

  const { account, authenticated } = useAuth()
  const navigate = useNavigate()
  const isMine = useMemo(() => creatorAccount?.id === account.id, [account])
  const [state, setState] = useState({
    editing: false,
    postRate: score,
  })

  const [ratePost] = useMutation<PostRate>(UPDATE_POST_RATE_MUTATION, {
    onCompleted(response) {
      if (response.ratePost.isSuccess)
        response.ratePost.quality === Quality.GOOD
          ? setState({ ...state, postRate: state.postRate + 1 })
          : setState({ ...state, postRate: state.postRate - 1 })
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  return state.editing ? (
    <AS3PostForm
      data={data}
      onSave={data => {
        if (data.title !== '' && data.markdownContent !== '')
          setState({ ...state, editing: false })
        else setState({ ...state, editing: true })
        afterEdit && afterEdit(data)
      }}
    />
  ) : (
    <Card className={classList.join(' ')}>
      <div className="d-flex flex-row">
        <Card.Body className="as3-post-card-prefix p-2">
          <AS3Button
            className="action px-1"
            icon={mdiArrowUpBoldOutline}
            size="sm"
            iconSize={0.8}
            text
            onClick={() => {
              ratePost({
                variables: {
                  input: { postId: id, quality: Quality.GOOD },
                },
              })
            }}
          />
          <span className="card-subtitle">{state.postRate}</span>
          <AS3Button
            className="action px-1"
            icon={mdiArrowDownBoldOutline}
            size="sm"
            iconSize={0.8}
            text
            onClick={() => {
              ratePost({
                variables: {
                  input: { postId: id, quality: Quality.BAD },
                },
              })
            }}
          />
        </Card.Body>

        <Card.Body className="as3-post-card-main p-0">
          <Card.Subtitle className="px-2 pt-2 pb-0">
            <span className="category">as3/category</span>
            <span className="separator mx-1">•</span>
            <span className="publish">
              posted by &nbsp;
              {creatorAccount ? (
                <AS3Link
                  onClick={() => navigate(`/profile/${creatorAccount?.id}`)}
                >
                  {creatorAccount?.username
                    ? creatorAccount.username
                    : 'Unknown User'}
                </AS3Link>
              ) : (
                '[deleted account]'
              )}
            </span>
            <span className="separator mx-1">•</span>
            <span className="text-muted fw-normal">
              {DateTime.fromISO(createdAt).toRelative()}
            </span>

            <AS3Spacer />

            <Stack
              direction="horizontal"
              gap={2}>
              {(editable || isMine) && (
                <AS3Button
                  className="action"
                  text
                  size="sm"
                  icon={mdiPencilOutline}
                  onClick={() => {
                    dispatch({ type: 'FETCH_ERROR', payload: undefined })
                    setState({ ...state, editing: true })
                  }}
                />
              )}
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
              className="action"
              text
              size="sm"
              icon={mdiMessageOutline}
              onClick={() => navigate(`/posts/${id}`)}
            >
              {commentsCount} Comments
            </AS3Button>

            {authenticated && (
              <AS3Button
                className="action"
                text
                size="sm"
                icon={collected ? mdiBookmark : mdiBookmarkOutline}
                onClick={() => (collected ? deletePostId(id) : addPostId(id))}
              >
                Collect
              </AS3Button>
            )}
          </Card.Footer>
        </Card.Body>
      </div>

      {!preview && authenticated && (
        <Card.Body className="px-1 py-0">
          <ReplyInputComponent />
        </Card.Body>
      )}

      {comments.length > 0 && (
        <Card.Body className="as3-post-card-extension">
          <CommentsComponent data={comments} />
        </Card.Body>
      )}
    </Card>
  )
}
