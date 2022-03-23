import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { useDispatch, useSelector } from 'system/store'
import { AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { GET_POST_QUERY } from './gql'
import { GetPost } from 'system/generated/gql.types'
import { useEffect } from 'react'
import { DateTime } from 'luxon'

export default function PostPage() {
  const { processor } = useSelector(store => store.post)
  const dispatch = useDispatch()
  const { id } = useParams()
  const variables = { id }

  const { data, loading, refetch } = useQuery<GetPost>(GET_POST_QUERY, {
    variables,
    onCompleted({ post: response }) {
      response && dispatch({ type: 'SET_POST_ID', payload: response.id })
    },
  })

  useEffect(() => {
    refetch()
  }, [processor])

  if (loading || !data?.post) {
    return <>fetching, wait for it</>
  }

  return (
    <AS3LayoutWithSidebar sidebar={<span>hello</span>}>
      <AS3PostCard
        data={{
          ...data.post,
          comments: data.post.comments?.items?.map(s => ({ ...s })) ?? [],
        }}
      />
    </AS3LayoutWithSidebar>
  )
}
