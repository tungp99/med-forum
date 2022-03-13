export type { Pagination } from './misc.types'

export type Entity = {
  id: string
  updatedAt: string
  createdAt: string
}

export type Post = Entity & {
  title: string
  markdownContent: string
  isPublished: boolean
  commentsCount: number
}

export type Profession = {
  organization: string
  start: string | null
  end: string | null
  position: string
  isWorking: boolean
}

export type Profile = {
  isPublic: boolean
  firstName: string
  lastName: string
  phoneNumber: string
  birthDate?: string
  professions: Profession[]
  educations: Profession[]
}

export type Account = Entity & {
  email: string
  username: string | null
  profile: Profile
}
