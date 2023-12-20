import { PATH_IMAGE } from 'shared/lib/paths'
import { PostDto } from '../dto/post.dto'
import { type Post } from '../model/post.model'
import { memberMapper } from 'entities/member/@x/post'
import dayjs from 'dayjs'

export const postMapper = (dto: PostDto): Post => {
  return {
    id: dto.id,
    createdAt: dayjs(dto.createdAt).format('MMM D, YYYY'),
    updatedAt: dayjs(dto.updatedAt).format('MMM D, YYYY'),
    memberId: dto.memberId,
    status: dto.status,
    slug: dto.slug,
    type: dto.type,
    image: PATH_IMAGE(dto.image),
    title: dto.title,
    text: dto.text,
    points: dto.points,
    totalNumComments: dto.totalNumComments,
    wasUpvotedByMe: dto.wasUpvotedByMe,
    wasDownvotedByMe: dto.wasDownvotedByMe,
    member: memberMapper(dto.member),
  }
}
