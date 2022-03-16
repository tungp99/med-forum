import { useNavigate } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { Card, Stack } from 'react-bootstrap'
import { mdiChevronDoubleLeft } from '@mdi/js'

import { Toast } from 'system/store'
import { useAuth } from 'system/auth'
import {
  AS3Button,
  AS3Editor,
  AS3Input,
  AS3Layout,
  AS3Link,
  AS3Spacer,
} from 'system/components'
import { CREATE_POST_MUTATION } from './gql'
import { CreatePost, CreatePostInput } from 'system/generated/gql.types'

export default function PostsCreatePage() {
  const navigate = useNavigate()
  const { gqlContext } = useAuth()
  const { handleSubmit, setValue, control } = useForm<CreatePostInput>({
    defaultValues: { title: '', markdownContent: '', isPublished: false },
  })
  const [createPost, { loading }] = useMutation<CreatePost>(
    CREATE_POST_MUTATION,
    {
      ...gqlContext,
      onCompleted() {
        navigate('/manage')
      },
      onError({ name, message }) {
        Toast.error({ title: name, content: message })
      },
    }
  )

  const submit = handleSubmit(data => {
    createPost({ variables: { input: data } })
  })

  return (
    <AS3Layout>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <AS3Input
            label="Title"
            className="mb-3"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="markdownContent"
        render={({ field: { onChange, value } }) => (
          <AS3Editor
            className="mb-3"
            value={value}
            onChange={onChange} />
        )}
      />

      <Card>
        <Card.Body>
          <Stack
            direction="horizontal"
            gap={3}>
            <AS3Link
              icon={mdiChevronDoubleLeft}
              iconSize={0.8}
              onClick={() => navigate('/')}
            >
              Back to Home
            </AS3Link>

            <AS3Spacer />

            <AS3Button
              variant="outline-success"
              loading={loading}
              disabled={loading}
              onClick={() => {
                setValue('isPublished', false)
                submit()
              }}
            >
              Save as Draft
            </AS3Button>

            <AS3Button
              variant="danger"
              loading={loading}
              disabled={loading}
              onClick={() => {
                setValue('isPublished', true)
                submit()
              }}
            >
              Publish
            </AS3Button>
          </Stack>
        </Card.Body>
      </Card>
    </AS3Layout>
  )
}
