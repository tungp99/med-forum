import { useNavigate } from 'react-router-dom'
import { Card, ListGroup } from 'react-bootstrap'
import { AS3Link } from 'system/components'

export function SidebarComponent() {
  const navigate = useNavigate()

  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item className="text-end">
          <AS3Link onClick={() => navigate('/admin')}>Posts</AS3Link>
        </ListGroup.Item>
        <ListGroup.Item className="text-end">
          <AS3Link onClick={() => navigate('/admin/users')}>Users</AS3Link>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  )
}
