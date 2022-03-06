import { AS3LayoutWithSidebar, AS3PostNavigator } from 'system/components'
import { AS3PostCard } from 'system/components/as3-post-card/as3-post-card.component'

export default function HomePage() {
  return (
    <AS3LayoutWithSidebar>
      <AS3PostNavigator />

      <AS3PostCard />
    </AS3LayoutWithSidebar>
  )
}
