import { useNavigate } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
import { AS3Link } from 'system/components'
import { useAuth } from 'system/auth'

export function SidebarComponent() {
  const navigate = useNavigate()
  const { openCreateUserPopup } = useAuth()

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item className="text-end">
          <AS3Link onClick={() => navigate('/manage')}>Posts</AS3Link>
        </ListGroup.Item>
        <ListGroup.Item className="text-end">
          <AS3Link onClick={() => navigate('/manage/users')}>Users</AS3Link>
        </ListGroup.Item>
        <ListGroup.Item className="text-end">
          <AS3Link
            onClick={() => {
              openCreateUserPopup()
            }}
          >
            + Users
          </AS3Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}
