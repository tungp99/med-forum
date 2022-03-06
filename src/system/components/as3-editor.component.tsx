import { ComponentPropsWithoutRef } from 'react'
import MdEditor from 'react-markdown-editor-lite'

import { mdParser } from 'system/plugins'

type AS3EditorProps = ComponentPropsWithoutRef<'textarea'> & {
  value?: string
  height?: number
  onChange: (content: string) => void
}

export function AS3Editor(props: AS3EditorProps) {
  return (
    <MdEditor
      className={props.className}
      value={props.value}
      renderHTML={text => mdParser.render(text)}
      onChange={({ text }) => props.onChange(text)}
      style={{ height: props.height ?? 500 }}
    />
  )
}
