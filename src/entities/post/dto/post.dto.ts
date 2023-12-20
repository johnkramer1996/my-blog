import { MemberDto } from 'entities/member/@x/post'
import { PostStatus } from '../model/post-status'

export type PostDto = {
  id: string
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
  member: MemberDto
}
