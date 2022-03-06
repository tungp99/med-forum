import { Stack } from 'react-bootstrap'
import { useForm, Controller } from 'react-hook-form'

import {
  AS3Button,
  AS3Editor,
  AS3Input,
  AS3Layout,
  AS3Spacer,
} from 'system/components'
import { Post } from 'system/types'

export default function PostsCreatePage() {
  const { handleSubmit, control, setValue } = useForm<Partial<Post>>({
    defaultValues: { title: '', markdownContent: '', published: false },
  })

  const submit = (data: Partial<Post>) => console.log(data)

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

      <Stack
        className="mb-3"
        direction="horizontal"
        gap={3}>
        <AS3Spacer />

        <AS3Button
          variant="secondary"
          onClick={e => {
            setValue('published', false)
            handleSubmit(submit)(e)
          }}
        >
          Save as Draft
        </AS3Button>

        <AS3Button
          variant="primary"
          onClick={e => {
            setValue('published', true)
            handleSubmit(submit)(e)
          }}
        >
          Publish
        </AS3Button>
      </Stack>
    </AS3Layout>
  )
}
