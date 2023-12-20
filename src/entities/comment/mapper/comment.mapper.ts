import { memberMapper } from 'entities/member/@x/post'
import dayjs from 'dayjs'
import { CommentDto } from '../dto/comment.dto'
import { Comment } from '../model/comment.model'

export const commentMapper = (dto: CommentDto): Comment => ({
  id: dto.id,
  createdAt: dayjs(dto.createdAt).format('MMM D, YYYY HH:mm:ss'),
  updatedAt: dayjs(dto.updatedAt).format('MMM D, YYYY'),
  parentId: dto.parentId,
  text: dto.text,
  points: dto.points,
  countChild: dto.countChild,
  wasUpvotedByMe: dto.wasUpvotedByMe,
  wasDownvotedByMe: dto.wasDownvotedByMe,
  member: memberMapper(dto.member),
})
