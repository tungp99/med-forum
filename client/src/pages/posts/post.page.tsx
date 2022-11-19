import { useParams } from 'react-router-dom'
import { useLazyQuery, useQuery } from '@apollo/client'

import { Toast, useDispatch, useSelector } from 'system/store'
import { AS3LayoutWithSidebar, AS3PostCard } from 'system/components'
import { GET_POST_QUERY } from './gql'
import { GetAccount, GetPost } from 'system/generated/gql.types'
import { useEffect, useMemo } from 'react'
import { OverviewCardComponent } from 'pages/profile/components/overview.card.component'
import { GET_ACCOUNT_QUERY } from 'pages/profile/gql'

export default function PostPage() {
  const { processor } = useSelector(store => store.post)
  const dispatch = useDispatch()
  const { id } = useParams()

  const { data, loading, refetch } = useQuery<GetPost>(GET_POST_QUERY, {
    variables: { id },
    onCompleted({ post: response }) {
      response && dispatch({ type: 'SET_POST_ID', payload: response.id })
    },
  })

  const fetchAccountVariables = useMemo(
    () => ({ id: data?.post?.creatorAccount?.id }),
    [data?.post?.creatorAccount?.id]
  )
  const [
    fetchAccount,
    { data: data_profile, refetch: refetchAccount, called },
  ] = useLazyQuery<GetAccount>(GET_ACCOUNT_QUERY, {
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  useEffect(() => {
    if (!fetchAccountVariables.id) return
    if (called) refetchAccount(fetchAccountVariables)
    else fetchAccount({ variables: fetchAccountVariables })
  }, [fetchAccountVariables])

  useEffect(() => {
    refetch()
  }, [processor])

  if (loading || !data?.post) {
    return <>fetching, wait for it</>
  }

  return (
    <AS3LayoutWithSidebar
      sidebar={
        data_profile?.account ? (
          <OverviewCardComponent
            data={{
              profile: data_profile?.account?.profile,
              username: data_profile?.account?.username,
              email: data_profile?.account?.email,
              id: data_profile.account.id,
            }}
            editable={false}
          />
        ) : (
          'unknown user'
        )
      }
    >
      <AS3PostCard
        data={{
          ...data.post,
          comments: data.post.comments?.items?.map(s => ({ ...s })) ?? [],
        }}
      />
    </AS3LayoutWithSidebar>
  )
}
