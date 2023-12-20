import { useCallback } from 'react'
import { Pagination } from 'shared/ui'
import { PostActions } from 'widgets'
import { getMemberRole, useAppSelector } from 'shared/model'
import { Post, PostCard, PostList, PostListProps } from 'entities/post'
import { memberApi } from 'entities/member'
import { PostStatus } from 'entities/post/model/post-status'

type Props = {
  count: number
  page: number
  limit: number
  login?: string
  postStatus?: PostStatus
  onChangePage: (page: number) => void
} & PostListProps

export const PostListWidget = (props: Props) => {
  const { posts, count, page, limit, login, postStatus: status, onChangePage, ...postsState } = props

  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())

  const renderPost = useCallback(
    (post: Post) => {
      return (
        <PostCard
          key={post.slug}
          post={post}
          type='vertical'
          actionsSlot={<PostActions post={post} meta={{ page, limit, login, status }} size='md' role={getMemberRole(currentMember, post.member)} />}
          className='items__item col-lg-6 col-12 item-bg--grid'
        />
      )
    },
    [currentMember, page, limit, login, status]
  )

  return (
    <PostList
      posts={posts}
      type='vertical'
      renderPost={renderPost}
      afterSlot={
        <>
          <Pagination onChangePage={onChangePage} count={count} page={page} limit={limit} className='mt-50' />
        </>
      }
      {...postsState}
    />
  )
}
