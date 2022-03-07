import { ComponentPropsWithoutRef } from 'react'
import MdEditor from 'react-markdown-editor-lite'

import { mdParser } from 'system/plugins'

import './as3-editor.style.scss'

type AS3EditorProps = ComponentPropsWithoutRef<'textarea'> & {
  preview?: boolean
  value?: string
  height?: number | string
  minHeight?: number | string
  onChange?: (content: string) => void
}

export function AS3Editor({
  className,
  preview,
  value,
  height,
  minHeight,
  onChange,
}: AS3EditorProps) {
  const classList = ['as3-editor']
  preview && classList.push('as3-editor-preview')
  className && classList.push(className)

  return (
    <MdEditor
      className={classList.join(' ')}
      value={value}
      renderHTML={text => mdParser.render(text)}
      onChange={({ text }) => onChange && onChange(text)}
      style={{ height: height ?? 500, minHeight: minHeight }}
      view={{ html: true, menu: !preview ?? true, md: !preview ?? true }}
    />
  )
}
