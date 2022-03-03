import { ReactNode } from 'react'
import { Card, Stack } from 'react-bootstrap'
import { faMessage } from '@fortawesome/free-regular-svg-icons'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

import { AS3Avatar } from '../as3-avatar.component'
import { AS3Link } from '../as3-link/as3-link.component'

import './comment.style.scss'

type CommentComponentProps = {
  children?: ReactNode
}

export function CommentComponent(props: CommentComponentProps) {
  return (
    <>
      <Card.Subtitle>
        <AS3Avatar />
        <span className="category ms-2">drjohnsmith</span>
        <span className="separator mx-1">•</span>
        <span className="publish">17 hrs. ago</span>
        <span className="separator mx-1">•</span>
        <span className="publish">edited 16 hrs. ago</span>
      </Card.Subtitle>

      <Card.Text
        className="markdown-content"
        as="div">
        <div className="markdown-content-line">&nbsp;</div>
        <div className="markdown-content-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet
          facilisis magna etiam tempor orci eu lobortis. Tincidunt arcu non
          sodales neque sodales ut etiam.
        </div>
      </Card.Text>

      <Stack
        className="actions"
        direction="horizontal"
        gap={3}>
        <div>
          <AS3Link icon={faAngleUp}></AS3Link>
          <span className="as3-link mx-2">22k</span>
          <AS3Link icon={faAngleDown}></AS3Link>
        </div>

        <AS3Link icon={faMessage}>Reply</AS3Link>

        <AS3Link>Report</AS3Link>
      </Stack>

      <div className="replies">{props.children}</div>
    </>
  )
}
