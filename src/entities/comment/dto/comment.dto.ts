import { MemberDto } from 'entities/member/@x/post'

export type CommentDto = {
  id: string
  createdAt: string
  updatedAt: string | null
  parentId: string | null
  text: string
  points: number
  countChild: number
  wasUpvotedByMe: boolean
  wasDownvotedByMe: boolean
  member: MemberDto
}
