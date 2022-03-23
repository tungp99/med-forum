export type { PostSubmission } from './misc.types'

export type Entity = {
  id: string
  createdAt: string
  updatedAt: string
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
  experience: Profession[]
  education: Profession[]
  country: string
  countryCode: string
}

export type Account = Entity & {
  email: string
  username: string | null
  profile: Profile
  isGod?: boolean
  writtenPostsCount?: number
}

export type Comment = Entity & {
  markdownContent: string
  repliesCount: number
  creatorAccount: Partial<Account> | null
}

export type Post = Entity & {
  title: string
  markdownContent: string
  isPublished: boolean
  commentsCount: number
  comments: Comment[]
  creatorAccount: Partial<Account> | null
  score: number
}

export type Qualification = {
  title: string
  issuedBy: string
  issuedAt: string
  expireAt: string
}
