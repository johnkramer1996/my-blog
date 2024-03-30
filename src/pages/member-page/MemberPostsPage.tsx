import React from 'react'
import { useMemberByLoginQuery } from 'entities/member'
import { usePostsByLoginQuery } from 'entities/post/api/post.api'
import { useParams } from 'react-router-dom'
import { LIMIT } from 'shared/const'
import { errorHandler } from 'shared/lib'
import { usePaginationQuery } from 'shared/model'
import { SectionTitle } from 'shared/ui'
import { PostListWidget } from 'widgets'

const limit = LIMIT.posts.member

export const MemberPostsPage = () => {
  const { login } = useParams() as { login: string }
  const { data: member, isLoading, isSuccess, error } = useMemberByLoginQuery({ login })
  const [page, onChangePage] = usePaginationQuery()
  const { data: { data: posts = [], count = 0 } = {}, ...postsState } = usePostsByLoginQuery({ login, limit, page })

  if (isLoading) return <div>loading</div>

  if (!isSuccess) return errorHandler(error)

  return (
    <section className='s-posts'>
      <SectionTitle className='mb-30' subtitle={`${count} posts`} left>
        Posts
      </SectionTitle>
      <PostListWidget {...{ posts, count, page, limit, login, onChangePage }} {...postsState} />
    </section>
  )
}
