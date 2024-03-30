import React, { useCallback, useMemo } from 'react'
import { Post, PostList, PostOrderBy, postApi, usePostsQuery } from 'entities/post'
import { PostCard } from 'entities/post'
import { LIMIT } from 'shared/const'
import { useAppDispatch, useAppSelector, usePaginationQuery } from 'shared/model'
import { Pagination, SectionTitle } from 'shared/ui'
import { Button, Icon } from 'shared/ui'
import { PostsPage } from './PostsPage'
import { PostActions } from 'widgets'
import { POST_TAG } from 'shared/api'
import { useSearchParams } from 'react-router-dom'
import { memberApi } from 'entities/member'
import { getMemberRole } from 'shared/lib'

const limit = LIMIT.posts.main

export const MainPage = () => {
  const dispatch = useAppDispatch()
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const [searchParams, setSearchParams] = useSearchParams()
  const orderParams = useMemo(() => (searchParams.get('order') as PostOrderBy | undefined) ?? undefined, [searchParams])
  const [queryPage, setQueryPage] = usePaginationQuery()
  const [page, setPage] = React.useState(queryPage)
  const [selectedPages, setSelectedPages] = React.useState([queryPage])
  const { data: { data: posts = [], count = 0, lastPage } = {}, ...postsState } = usePostsQuery({ limit, page, order: orderParams })

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
      !order && searchParams.delete('order')
      order === 'recent' ? searchParams.delete('order') : searchParams.set('order', order)
      setSearchParams(searchParams, { preventScrollReset: true })
      onChangePage(1)
      dispatch(postApi.util.invalidateTags([{ type: POST_TAG, id: order }]))
    },
    [dispatch, onChangePage, searchParams, setSearchParams]
  )

  const renderPost = useCallback(
    (page: number, limit: number, order?: PostOrderBy) => (post: Post) => {
      const owner = getMemberRole(currentMember, post.member) === 'owner'

      return (
        <PostCard
          key={post.slug}
          post={post}
          actionsSlot={
            <PostActions
              post={post}
              meta={{ page, order, limit }}
              size='md'
              editPermission={currentMember?.editPermission || owner}
              deletePermission={currentMember?.deletePermission || owner}
            />
          }
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
              <Button onClick={() => onChangeTab('recent')} withoutColor={!(orderParams === undefined)}>
                Recent
              </Button>
              <Button onClick={() => onChangeTab('popular')} withoutColor={!(orderParams === 'popular')}>
                Popular
              </Button>
            </div>
          </div>

          <PostList
            posts={posts}
            renderPost={renderPost(page, limit, orderParams)}
            afterPostsSlot={selectedPages.slice(1).map((page) => (
              <PostsPage key={page} limit={limit} page={page} order={orderParams ?? 'recent'} renderPost={renderPost(page, limit, orderParams)} />
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
