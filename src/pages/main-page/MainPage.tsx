import React, { useCallback, useMemo } from 'react'
import { Post, PostList, PostOrderBy, postApi, usePostsQuery } from 'entities/post'
import { PostCard } from 'entities/post'
import { LIMIT } from 'shared/const'
import { getMemberRole, useAppDispatch, useAppSelector, usePaginationQuery } from 'shared/model'
import { Pagination, SectionTitle } from 'shared/ui'
import { Button, Icon } from 'shared/ui'
import { PostsPage } from './PostsPage'
import { PostActions } from 'widgets'
import { POST_TAG } from 'shared/api'
import { useSearchParams } from 'react-router-dom'
import { memberApi } from 'entities/member'

const limit = LIMIT.posts.main

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const [searchParams, setSearchParams] = useSearchParams()
  const order = useMemo(() => (searchParams.get('order') as PostOrderBy) ?? 'recent', [searchParams])
  const [queryPage, setQueryPage] = usePaginationQuery()
  const [page, setPage] = React.useState(queryPage)
  const [selectedPages, setSelectedPages] = React.useState([queryPage])
  const { data: { data: posts = [], count = 0, lastPage } = {}, ...postsState } = usePostsQuery({ limit, page, order })

  const onChangePage = useCallback(
    (page: number) => {
      setQueryPage(page)
      setPage(page)
      setSelectedPages([page])
    },
    [setQueryPage]
  )
  const onShowMore = useCallback(() => {
    setQueryPage(queryPage + 1)
    setSelectedPages((p) => [...p, queryPage + 1])
  }, [queryPage, setQueryPage])

  const onChangeTab = useCallback(
    (order: PostOrderBy) => {
      order === 'recent' ? searchParams.delete('order') : searchParams.set('order', order)
      setSearchParams(searchParams, { preventScrollReset: true })
      onChangePage(1)
      dispatch(postApi.util.invalidateTags([{ type: POST_TAG, id: order }]))
    },
    [dispatch, onChangePage, searchParams, setSearchParams]
  )

  const renderPost = useCallback(
    (page: number, limit: number, order?: PostOrderBy) => (post: Post) => {
      return (
        <PostCard
          key={post.slug}
          post={post}
          actionsSlot={<PostActions post={post} meta={{ page, order, limit }} size='md' role={getMemberRole(currentMember, post.member)} />}
          className='items__item'
        />
      )
    },
    [currentMember]
  )

  return (
    <>
      <section className='section s-posts'>
        <div className='container'>
          <SectionTitle className='mb-50'>Posts</SectionTitle>
          <div className='tabs mb-50'>
            <div className='tabs--buttons'>
              <Button onClick={() => onChangeTab('recent')} withoutColor={!(order === 'recent')}>
                Recent
              </Button>
              <Button onClick={() => onChangeTab('popular')} withoutColor={!(order === 'popular')}>
                Popular
              </Button>
            </div>
          </div>

          <PostList
            posts={posts}
            renderPost={renderPost(page, limit, order)}
            afterPostsSlot={selectedPages.slice(1).map((page) => (
              <PostsPage key={page} limit={limit} page={page} order={order} renderPost={renderPost(page, limit, order)} />
            ))}
            afterSlot={
              <>
                {!(lastPage === queryPage) && (
                  <div className='mt-50 text-center'>
                    <Button color='secondary' size='sm' onClick={onShowMore}>
                      <Icon type='eye' left /> Show more
                    </Button>
                  </div>
                )}
                <Pagination
                  onChangePage={onChangePage}
                  count={count}
                  page={queryPage}
                  limit={limit}
                  lastPage={lastPage}
                  selectedPages={selectedPages}
                  className='mt-30'
                ></Pagination>
              </>
            }
            {...postsState}
          />
        </div>
      </section>
    </>
  )
}
