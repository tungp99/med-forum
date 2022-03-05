import { AS3LayoutWithSidebar } from 'system/components'
import { AS3PostCard } from 'system/components/as3-post-card/as3-post-card.component'
import { Filter } from './components/filter'

export default function HomePage() {
  return (
    <AS3LayoutWithSidebar>
      <Filter />

      <AS3PostCard />
    </AS3LayoutWithSidebar>
  )
}
