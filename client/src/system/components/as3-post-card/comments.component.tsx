import { DateTime } from 'luxon'
import { Card, Stack } from 'react-bootstrap'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiMessageOutline,
  mdiPencilOutline,
} from '@mdi/js'

import { Comment } from 'system/types'
import { Toast, useDispatch } from 'system/store'
import { AS3Avatar, AS3Button, AS3Editor, AS3Link } from 'system/components'
import {
  GET_REPLIES_QUERY,
  UPDATE_COMMENT_MUTATION,
  UPDATE_COMMENT_RATE_MUTATION,
} from './gql'
import {
  GetReplies,
  Quality,
  UpdateComment,
  UpdateCommentInput,
  UpdateCommentRate,
} from 'system/generated/gql.types'

import './comments.style.scss'
import { useMemo, useState } from 'react'
import { ReplyInputComponent } from './reply-input.component'
import { useAuth } from 'system/auth'
import { AS3Spacer } from '../as3-spacer.component'
import { AS3Input } from '../as3-input/as3-input.component'
import { Controller, useForm } from 'react-hook-form'

type CommentComponentProps = {
  data: Comment
}

function CommentComponent({
  data: {
    id,
    markdownContent,
    repliesCount,
    creatorAccount,
    createdAt,
    updatedAt,
    score,
  },
}: CommentComponentProps) {
  const dispatch = useDispatch()
  const { account, hasFullAccess } = useAuth()
  const isMine = useMemo(() => creatorAccount?.id === account.id, [account])
  const [state, setState] = useState({
    replying: false,
    commentRate: score,
    editing: false,
  })
  const [fetchReplies, { data, loading }] = useLazyQuery<GetReplies>(
    GET_REPLIES_QUERY,
    {
      variables: {
        commentId: id,
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [updateCommentRate] = useMutation<UpdateCommentRate>(
    UPDATE_COMMENT_RATE_MUTATION,
    {
      onCompleted(response) {
        response.rateComment.isSuccess === true &&
        response.rateComment.quality === Quality.GOOD
          ? setState({ ...state, commentRate: state.commentRate + 1 })
          : setState({ ...state, commentRate: state.commentRate - 1 })
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const [updateComment] = useMutation<UpdateComment>(UPDATE_COMMENT_MUTATION, {
    onCompleted() {
      dispatch({ type: 'REFRESH_POST' })
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  const { control, handleSubmit } = useForm<UpdateCommentInput>({
    defaultValues: {
      markdownContent: markdownContent,
      id,
    },
  })
  return (
    <Card.Text as="div">
      <div className="markdown-content-line">&nbsp;</div>
      <div className="Bao">
        <Card.Subtitle>
          <AS3Avatar className="ml-2" />
          <span className="category ms-2">{creatorAccount?.username}</span>
          <span className="separator mx-1">•</span>
          <span className="publish">
            {DateTime.fromISO(createdAt).toRelative()}
          </span>
          <span className="separator mx-1">•</span>
          <span className="publish">
            edited {DateTime.fromISO(updatedAt).toRelative()}
          </span>
          <AS3Spacer />
          {!state.editing && (
            <Stack
              direction="horizontal"
              gap={2}>
              {(hasFullAccess() || isMine) && (
                <AS3Button
                  className="action BaoMark"
                  text
                  size="sm"
                  icon={mdiPencilOutline}
                  onClick={() => {
                    setState({ ...state, editing: true })
                  }}
                />
              )}
            </Stack>
          )}
        </Card.Subtitle>
        {state.editing ? (
          <Controller
            control={control}
            name="markdownContent"
            render={({ field: { onChange, value } }) => (
              <AS3Input
                className="mb-0 ms-4 w-80"
                value={value}
                onChange={onChange}
                onKeyUp={e => {
                  if (e.key === 'Enter') {
                    handleSubmit(
                      data =>
                        data.markdownContent &&
                        updateComment({ variables: { input: { ...data, id } } })
                    )()
                  }
                }}
              />
            )}
          />
        ) : (
          <div className="markdown-content">
            <AS3Editor
              preview
              value={markdownContent}
              height="auto" />
          </div>
        )}
        <Stack
          className="actions"
          direction="horizontal"
          gap={3}>
          <div className="d-flex align-items-center">
            <AS3Link
              icon={mdiArrowUpBoldOutline}
              onClick={() =>
                updateCommentRate({
                  variables: { commentId: id, quality: Quality.GOOD },
                })
              }
            />
            <span className="as3-link mx-2">{state.commentRate}</span>
            <AS3Link
              icon={mdiArrowDownBoldOutline}
              onClick={() =>
                updateCommentRate({
                  variables: { commentId: id, quality: Quality.BAD },
                })
              }
            />
          </div>

          <AS3Link
            icon={mdiMessageOutline}
            onClick={() => setState({ ...state, replying: true })}
          >
            Reply
          </AS3Link>
        </Stack>
      </div>
      {state.replying && (
        <div className="actions mt-2">
          <ReplyInputComponent replyToCommentId={id} />
        </div>
      )}
      <div className="py-2 ps-4">
        {data?.replies?.items ? (
          <CommentsComponent data={data.replies.items} />
        ) : (
          repliesCount > 0 && (
            <AS3Link
              className="text-primary"
              loading={loading}
              disabled={loading}
              onClick={() => fetchReplies()}
            >
              continue this thread
            </AS3Link>
          )
        )}
      </div>
    </Card.Text>
  )
}

type CommentsComponentProps = {
  data: Comment[]
}

export function CommentsComponent({ data }: CommentsComponentProps) {
  return (
    <>
      {data.map(s => (
        <CommentComponent
          key={s.id}
          data={s} />
      ))}
    </>
  )
}
