import { DateTime } from 'luxon'
import { Controller, useForm } from 'react-hook-form'
import { Card, Stack } from 'react-bootstrap'

import { Post } from 'system/types'
import { AS3Button, AS3Editor, AS3Input, AS3Spacer } from 'system/components'
import { CreatePostInput, UpdatePostInput } from 'system/generated/gql.types'

type AS3PostFormProps = {
  data: Post
  onSave: (data: CreatePostInput | UpdatePostInput) => void
}

export function AS3PostForm({
  data: { id, title, markdownContent, createdAt, creatorAccount, isPublished },
  onSave,
}: AS3PostFormProps) {
  const { handleSubmit, setValue, control } = useForm<
    CreatePostInput | UpdatePostInput
  >({
    defaultValues: {
      id,
      title,
      markdownContent,
      isPublished,
    },
  })

  const submit = handleSubmit(data => onSave(data))

  return (
    <Card className="as3-post-card">
      <Card.Body className="as3-post-card-main p-0">
        <Card.Subtitle className="px-2 pt-2 pb-0">
          <span className="category">as3/category</span>
          <span className="separator mx-1">•</span>
          <span className="publish">
            posted by {creatorAccount?.username} &nbsp;
            {DateTime.fromISO(createdAt).toRelative()}
          </span>

          <AS3Spacer />

          <Stack
            direction="horizontal"
            gap={2}>
            {!isPublished && (
              <AS3Button
                size="sm"
                variant="outline-success"
                onClick={e => {
                  setValue('isPublished', false)
                  submit(e)
                }}
              >
                Save
              </AS3Button>
            )}

            <AS3Button
              size="sm"
              variant="danger"
              onClick={e => {
                setValue('isPublished', true)
                submit(e)
              }}
            >
              Publish
            </AS3Button>
          </Stack>
        </Card.Subtitle>

        <Card.Title className="px-2 pt-2 pb-0">
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
        </Card.Title>

        <Controller
          control={control}
          name="markdownContent"
          render={({ field: { onChange, value } }) => (
            <AS3Editor
              height="auto"
              minHeight={300}
              value={value}
              onChange={onChange}
            />
          )}
        />
      </Card.Body>
    </Card>
  )
}
