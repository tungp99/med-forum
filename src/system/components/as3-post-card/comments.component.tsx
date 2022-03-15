import { DateTime } from 'luxon'
import { Card, Stack } from 'react-bootstrap'
import { useLazyQuery } from '@apollo/client'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiMessageOutline,
} from '@mdi/js'

import { Comment } from 'system/types'
import { Toast } from 'system/store'
import { AS3Avatar, AS3Editor, AS3Link } from 'system/components'
import { GET_REPLIES_QUERY } from './gql'
import { GetReplies } from 'system/generated/gql.types'

import './comments.style.scss'

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
  },
}: CommentComponentProps) {
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

  return (
    <Card.Text as="div">
      <div className="markdown-content-line">&nbsp;</div>

      <Card.Subtitle>
        <AS3Avatar className="ml-2" />
        <span className="category ms-2">{creatorAccount?.username}</span>
        <span className="separator mx-1">•</span>
        <span className="publish">
          {DateTime.fromISO(createdAt).toLocaleString(DateTime.DATETIME_SHORT)}
        </span>
        <span className="separator mx-1">•</span>
        <span className="publish">
          edited{' '}
          {DateTime.fromISO(updatedAt).toLocaleString(DateTime.DATETIME_SHORT)}
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
          <AS3Link icon={mdiArrowUpBoldOutline} />
          <span className="as3-link mx-2">22k</span>
          <AS3Link icon={mdiArrowDownBoldOutline} />
        </div>

        <AS3Link icon={mdiMessageOutline}>Reply</AS3Link>

        <AS3Link>Report</AS3Link>
      </Stack>

      <div className="replies">
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
