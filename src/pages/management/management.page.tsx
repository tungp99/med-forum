import { Card } from 'react-bootstrap'
import { AS3Layout } from 'system/components'
import { Filter } from './components/filter.component'
import { Post } from './components/post.component'
import './management.style.scss'

export default function ManagementPage() {
  return (
    <AS3Layout>
      <Filter></Filter>
      <Post></Post>
    </AS3Layout>
  )
}
