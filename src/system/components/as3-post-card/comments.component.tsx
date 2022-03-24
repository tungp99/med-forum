import { DateTime } from 'luxon'
import { Card, Stack } from 'react-bootstrap'
import { useLazyQuery, useMutation } from '@apollo/client'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiMessageOutline,
} from '@mdi/js'

import { Comment } from 'system/types'
import { Toast } from 'system/store'
import { AS3Avatar, AS3Editor, AS3Link } from 'system/components'
import { GET_REPLIES_QUERY, UPDATE_COMMENT_RATE_MUTATION } from './gql'
import {
  GetReplies,
  Quality,
  UpdateCommentRate,
} from 'system/generated/gql.types'

import './comments.style.scss'
import { useState } from 'react'
import { ReplyInputComponent } from './reply-input.component'
import { useAuth } from 'system/auth'

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
  const [state, setState] = useState({ replying: false, commentRate: score })
  const { gqlContext } = useAuth()
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
      ...gqlContext,
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

  return (
    <Card.Text as="div">
      <div className="markdown-content-line">&nbsp;</div>

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
      </Card.Subtitle>

      <div className="markdown-content">
        <AS3Editor
          preview
          value={markdownContent}
          height="auto" />
      </div>

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

        <AS3Link>Report</AS3Link>
      </Stack>

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
