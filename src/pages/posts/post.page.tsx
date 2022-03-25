import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3Layout, AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { GET_POST_QUERY } from './gql'
import { GetAccount, GetPost } from 'system/generated/gql.types'
import { useEffect, useMemo } from 'react'
import { OverviewCardComponent } from 'pages/profile/components/overview.card.component'
import { GET_ACCOUNT_QUERY } from 'pages/profile/gql'

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

  const fetchAccountVariables = useMemo(
    () => ({ variables: { id: data?.post?.creatorAccount?.id ?? id } }),
    [data?.post?.creatorAccount?.id]
  )
  const [fetchAccount, { data: data_profile }] = useLazyQuery<GetAccount>(
    GET_ACCOUNT_QUERY,
    {
      onError({ name, message }) {
        message !==
          'The current user is not authorized to access this resource.' &&
          Toast.error({ title: name, content: message })
      },
    }
  )

  useEffect(() => {
    fetchAccount(fetchAccountVariables)
  }, [fetchAccountVariables])

  useEffect(() => {
    refetch()
  }, [processor])

  if (loading || !data?.post) {
    return <>fetching, wait for it</>
  }

  return (
    (data_profile?.account && (
      <AS3LayoutWithSidebar
        sidebar={
          <OverviewCardComponent
            data={{
              profile: data_profile?.account?.profile,
              username: data_profile?.account?.username,
              email: data_profile?.account?.email,
              id: data_profile.account.id,
            }}
            editable={false}
          />
        }
      >
        <AS3PostCard
          data={{
            ...data.post,
            comments: data.post.comments?.items?.map(s => ({ ...s })) ?? [],
          }}
        />
      </AS3LayoutWithSidebar>
    )) || (
      <AS3Layout>
        <AS3PostCard
          data={{
            ...data.post,
            comments: data.post.comments?.items?.map(s => ({ ...s })) ?? [],
          }}
        />
      </AS3Layout>
    )
  )
}
