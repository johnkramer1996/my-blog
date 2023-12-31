import { PostStatus } from './post-status'

export type CountPostsByAuthUser = {
  all: number
  byMember: number
  byStatus: { status: PostStatus; count: number }[]
}
