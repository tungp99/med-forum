import { Entity } from '.'

export type Post = Entity & {
  title: string
  markdownContent: string
  published: boolean
}
