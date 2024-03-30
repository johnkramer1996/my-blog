import { PostList } from 'entities/post'
import { LIMIT } from 'shared/const/limit'
import { useAppSelector, usePaginationQuery } from 'shared/model'
import { Button, Loader, Pagination, SectionTitle } from 'shared/ui'
import { PostStatus } from 'entities/post/model/post-status'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCountPostsByAuthUserQuery, usePostsByAuthUserQuery } from 'entities/post/api/post.api'
import { PATH_PAGE, errorHandler, getMemberRole } from 'shared/lib'
import { memberApi } from 'entities/member'
import { PostCardCabinet } from '../../../entities/post/ui/post-card-cabinet/PostCardCabinet'
import { PostCabinetActions } from 'widgets'
import { ChangePostStatus } from 'features/post/change-post-status'

const limit = LIMIT.posts.cabinet

export const CabinetPosts = () => {
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const [searchParams, setSearchParams] = useSearchParams()
  const statusParams: PostStatus | undefined = useMemo(() => (searchParams.get('status') as PostStatus | undefined) ?? undefined, [searchParams])
  const memberIdParams = useMemo(() => searchParams.get('memberId') ?? '', [searchParams])
  const [page, onChangePage] = usePaginationQuery()
  const { data: countPosts, isLoading, isSuccess, error } = useCountPostsByAuthUserQuery()
  const { data: { data: posts = [], count = 0 } = {}, ...postsState } = usePostsByAuthUserQuery({
    limit,
    page,
    memberId: memberIdParams || undefined,
    status: statusParams,
  })

  const onChangeTab = useCallback(
    ({ status, memberId }: { status?: PostStatus; memberId?: string } = {}) => {
      !status ? searchParams.delete('status') : searchParams.set('status', status)
      !memberId ? searchParams.delete('memberId') : searchParams.set('memberId', memberId)
      setSearchParams(searchParams, { preventScrollReset: true })
      onChangePage(1)
    },
    [onChangePage, searchParams, setSearchParams]
  )

  if (isLoading) return <Loader />
  if (!isSuccess) return errorHandler(error)

  return (
    <>
      <section className='s-posts'>
        <div className='section__head mb-30'>
          <div className='section-title-wrapper'>
            <SectionTitle left>All posts</SectionTitle>
          </div>
          <div className='section__actions'>
            <Button size='sm' to={PATH_PAGE.cabinet.posts.createPost} border>
              Add new posts
            </Button>
          </div>
        </div>
        <div className='tabs mb-50'>
          <div className='tabs--buttons'>
            <Button size='sm' onClick={() => onChangeTab()} withoutColor={Boolean(statusParams || memberIdParams)}>
              all {countPosts?.all}
            </Button>
            {Boolean(countPosts?.byMember) && (
              <Button size='sm' onClick={() => onChangeTab({ memberId: currentMember?.id })} withoutColor={!memberIdParams}>
                mine {countPosts.byMember}
              </Button>
            )}
            {countPosts?.byStatus.map(({ count, status }) => {
              return (
                <Button key={status} size='sm' onClick={() => onChangeTab({ status })} withoutColor={!(status === statusParams)}>
                  {status} {count}
                </Button>
              )
            })}
          </div>
        </div>
        <PostList
          posts={posts}
          type='horizontal'
          renderPost={(post) => {
            const owner = getMemberRole(currentMember, post.member) === 'owner'

            return (
              <PostCardCabinet
                key={post.id}
                post={post}
                actionSlot={
                  <PostCabinetActions
                    post={post}
                    editPermission={currentMember?.editPermission || owner}
                    deletePermission={currentMember?.deletePermission || owner}
                  />
                }
                moderationSlot={<ChangePostStatus post={post} />}
              />
            )
          }}
          afterSlot={
            <>
              <Pagination onChangePage={onChangePage} count={count} page={page} limit={limit} className='mt-50' />
            </>
          }
          {...postsState}
        />
      </section>
    </>
  )
}
