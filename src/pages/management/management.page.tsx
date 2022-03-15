import { AS3Layout } from 'system/components'
import { AS3PostCard } from 'system/components/as3-post-card/as3-post-card.component copy'

import { Filter } from './components/filter.component'

import './management.style.scss'

export default function ManagementPage() {
  return (
    <AS3Layout>
      <Filter></Filter>
      <AS3PostCard
        className=""
        data={{
          commentsCount: 4,
          createdAt: `${new Date()}`,
          isPublished: false,
          markdownContent: 'hhihi',
          title: 'haha',
          id: '1',
          updatedAt: '1',
          creatorAccount: '',
        }}
      />
    </AS3Layout>
  )
}
