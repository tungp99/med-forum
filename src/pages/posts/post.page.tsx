import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { GET_POST_QUERY } from './gql'
import { GetPost } from 'system/generated/gql.types'

export default function PostPage() {
  const { id } = useParams()
  const { data: fetchResponse, loading: fetchingPost } = useQuery<GetPost>(
    GET_POST_QUERY,
    {
      variables: {
        id,
      },
    }
  )

  if (fetchingPost || !fetchResponse?.post) {
    return <>fetching, wait for it</>
  }

  return (
    <AS3LayoutWithSidebar>
      <AS3PostCard data={fetchResponse.post} />
    </AS3LayoutWithSidebar>
  )
}
