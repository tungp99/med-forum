import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Toast, useDispatch, useSelector } from 'system/store'
import { useAuth } from 'system/auth'

import { AS3Input } from 'system/components'
import { CreateComment, CreateCommentInput } from 'system/generated/gql.types'
import { CREATE_COMMENT_MUTATION } from './gql'

type ReplyInputComponentProps = {
  replyToCommentId?: string
}

export function ReplyInputComponent({
  replyToCommentId,
}: ReplyInputComponentProps) {
  const { id: postId } = useSelector(store => store.post)
  const dispatch = useDispatch()
  const { gqlContext } = useAuth()

  const { control, handleSubmit } = useForm<CreateCommentInput>({
    defaultValues: {
      markdownContent: '',
      replyToCommentId,
    },
  })

  const [create] = useMutation<CreateComment>(CREATE_COMMENT_MUTATION, {
    ...gqlContext,
    onCompleted() {
      dispatch({ type: 'REFRESH_POST' })
    },
    onError({ name, message }) {
      Toast.error({ title: name, content: message })
    },
  })

  return (
    <Controller
      control={control}
      name="markdownContent"
      render={({ field: { onChange, value } }) => (
        <AS3Input
          className="mb-0 w-100"
          placeholder="reply to this post..."
          value={value}
          onChange={onChange}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              handleSubmit(data =>
                create({ variables: { input: { ...data, postId } } })
              )()
              return
            }
          }}
        />
      )}
    />
  )
}
