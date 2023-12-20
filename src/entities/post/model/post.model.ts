import { Member } from '../../member/model/member.model'
import { PostStatus } from './post-status'

export type PostId = string

export type Post = {
  id: PostId
  createdAt: string
  updatedAt: string | null
  memberId: string
  status: PostStatus
  slug: string
  type: string
  image: string
  title: string
  text: string
  points: number
  totalNumComments: number
  wasUpvotedByMe: boolean
  wasDownvotedByMe: boolean
  member: Member
}
