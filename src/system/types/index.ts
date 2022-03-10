export type { Pagination } from './misc.types'

export type Entity = {
  id: string | null
  updatedAt: Date
  createdAt: Date
}

export type Post = Entity & {
  title: string
  markdownContent: string
  published: boolean
  commentsCount: number
}

export type Profile = {
  firstName: string
  lastName: string
}

export type Account = Entity & {
  email: string
  username: string | null
  profile: Profile
}
