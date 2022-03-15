import { useLazyQuery } from '@apollo/client'

import { Toast } from 'system/store'
import { useAuth } from 'system/auth'
import { AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { GET_MY_POSTS_QUERY } from './gql'
import { GetPosts } from 'system/generated/gql.types'
import { useEffect } from 'react'

export default function ManagementPage() {
  const { account, authenticated } = useAuth()
  const [fetch, { data }] = useLazyQuery<GetPosts>(GET_MY_POSTS_QUERY, {
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  useEffect(() => {
    if (authenticated) {
      fetch({
        variables: { isPublished: false, skip: 0 * 8, accountId: account.id },
      })
    }
  }, [authenticated])

  return (
    <AS3LayoutWithSidebar>
      {data?.posts?.items?.map(post => (
        <AS3PostCard
          key={post.id}
          data={{ ...post }}
          editable />
      ))}
    </AS3LayoutWithSidebar>
  )
}
