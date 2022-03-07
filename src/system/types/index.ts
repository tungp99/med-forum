export type { Pagination } from './misc.types'

export type Entity = {
  id: string | null
  updatedAt: string
  createdAt: string
}

export type Post = Entity & {
  title: string
  markdownContent: string
  published: boolean
  commentsCount: number
}
