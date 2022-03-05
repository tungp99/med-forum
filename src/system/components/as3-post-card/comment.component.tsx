import { ReactNode } from 'react'
import { Card, Stack } from 'react-bootstrap'
import {
  mdiArrowDownBoldOutline,
  mdiArrowUpBoldOutline,
  mdiMessageOutline,
} from '@mdi/js'

import { AS3Avatar, AS3Link } from 'system/components'

import './comment.style.scss'

type CommentComponentProps = {
  children?: ReactNode
}

export function CommentComponent(props: CommentComponentProps) {
  return (
    <Card.Text as="div">
      <div className="markdown-content-line">&nbsp;</div>

      <Card.Subtitle>
        <AS3Avatar />
        <span className="category ms-2">drjohnsmith</span>
        <span className="separator mx-1">•</span>
        <span className="publish">17 hrs. ago</span>
        <span className="separator mx-1">•</span>
        <span className="publish">edited 16 hrs. ago</span>
      </Card.Subtitle>

      <div className="markdown-content">
        <div className="markdown-content-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
          facilisis magna etiam tempor orci eu lobortis. Tincidunt arcu non
          sodales neque sodales ut etiam.
        </div>
      </div>

      <Stack
        className="actions"
        direction="horizontal"
        gap={3}>
        <div className="d-flex align-items-center">
          <AS3Link icon={mdiArrowUpBoldOutline}></AS3Link>
          <span className="as3-link mx-2">22k</span>
          <AS3Link icon={mdiArrowDownBoldOutline}></AS3Link>
        </div>

        <AS3Link icon={mdiMessageOutline}>Reply</AS3Link>

        <AS3Link>Report</AS3Link>
      </Stack>

      <div className="replies">{props.children}</div>
    </Card.Text>
  )
}
