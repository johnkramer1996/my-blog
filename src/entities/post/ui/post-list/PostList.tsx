import classNames from 'classnames'
import { Post } from 'entities/post'
import { PostCardLoader } from 'entities/post/ui/post-card-loader/PostCardLoader'
import { PostCard, PostCardType } from 'entities/post/ui/post-card/PostCard'
import { PATH_PAGE } from 'shared/lib'
import { QueryFlags } from 'shared/model'
import { Button, LoaderWrapper, SectionTitle } from 'shared/ui'

export type PostListProps = {
  posts: Post[]
  type?: PostCardType
  renderPost?: (post: Post) => React.ReactNode
  afterPostsSlot?: React.ReactNode
  isLoadingMoreItems?: boolean
  afterSlot?: React.ReactNode
  className?: string
} & QueryFlags

export const PostList = (props: PostListProps) => {
  const {
    posts,
    type = 'horizontal',
    renderPost,
    afterPostsSlot: renderPostMore,
    isLoading,
    isFetching,
    isLoadingMoreItems: isLoadingShowMore,
    afterSlot,
    className,
  } = props

  const hasPosts = Boolean(posts.length)
  const isVertical = type === 'vertical'

  return (
    <>
      {!isLoading && !hasPosts ? (
        <div className='text-center'>
          <SectionTitle className='mb-30'>Nothing found</SectionTitle>
          {/* <p>Sorry, we couldn’t find the posts you’re looking for.</p>
          <div className='mt-50'>
            <Button to={PATH_PAGE.root}>Go to the main page</Button>
          </div> */}
        </div>
      ) : (
        <div className={classNames('items', { 'items--fetching': isFetching, row: isVertical }, className)}>
          <LoaderWrapper
            loader={(isVertical ? [1, 2] : [1]).map((_, i) => (
              <PostCardLoader key={i} className={classNames('items__item', { 'col-lg-6 col-12': isVertical })} />
            ))}
            isLoading={isLoading}
          >
            {renderPost ? posts.map(renderPost) : posts.map((post) => <PostCard key={post.slug} post={post} className='items__item' />)}
            {renderPostMore}
            {isLoadingShowMore && <PostCardLoader className='items__item'></PostCardLoader>}
          </LoaderWrapper>
        </div>
      )}
      {hasPosts && afterSlot}
    </>
  )
}
