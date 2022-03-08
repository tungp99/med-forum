import { Stack } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'

import {
  AS3Button,
  AS3Editor,
  AS3Input,
  AS3Layout,
  AS3Spacer,
} from 'system/components'

export default function PostsCreatePage() {
  const { handleSubmit, register, setValue, control } = useForm({
    defaultValues: { title: '', markdownContent: '', published: false },
  })

  const submit = () => handleSubmit(data => console.log(data))()

  return (
    <AS3Layout>
      <AS3Input
        {...register('title')}
        label="Title"
        className="mb-3" />

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
          onClick={() => {
            setValue('published', false)
            submit()
          }}
        >
          Save as Draft
        </AS3Button>

        <AS3Button
          variant="primary"
          onClick={() => {
            setValue('published', true)
            submit()
          }}
        >
          Publish
        </AS3Button>
      </Stack>
    </AS3Layout>
  )
}
