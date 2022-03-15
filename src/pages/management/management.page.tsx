import { useNavigate } from 'react-router-dom'
import { AS3Link } from 'system/components'

export default function ManagementPage() {
  const navigate = useNavigate()

  return (
    <>
      <AS3Link onClick={() => navigate('/manage/posts')}>Posts</AS3Link>
      <AS3Link onClick={() => navigate('/manage/users')}>Users</AS3Link>
    </>
  )
}
