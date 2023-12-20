import React from 'react'
import { Post, PostCardLoader, PostOrderBy, usePostsQuery } from 'entities/post'

type Props = {
  page: number
  limit: number
  order: PostOrderBy
  renderPost: (post: Post) => React.ReactNode
}
export const PostsPage = (props: Props) => {
  const { page, limit, order, renderPost } = props
  const { data: { data: posts = [] } = {}, isLoading } = usePostsQuery({ limit, page, order })

  return <>{isLoading ? <PostCardLoader className='items__item post__items-item' /> : <>{posts.map(renderPost)}</>}</>
}
