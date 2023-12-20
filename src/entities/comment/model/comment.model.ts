import { Member } from '../../member/model/member.model'

export type CommentId = string

export type Comment = {
  id: CommentId
  createdAt: string
  updatedAt: string | null
  parentId: string | null
  text: string
  points: number
  countChild: number
  wasUpvotedByMe: boolean
  wasDownvotedByMe: boolean
  member: Member
}
