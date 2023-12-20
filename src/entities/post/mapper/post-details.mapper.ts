import { PostDetailsDto } from '../dto/post-details.dto'
import { PostDetails } from '../model/post-detail.model'
import { postMapper } from './post.mapper'

export const postDetailsMapper = (dto: PostDetailsDto): PostDetails => postMapper(dto)
