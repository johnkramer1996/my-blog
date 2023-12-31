import { Post, PostHead } from 'entities/post'
import { Icon } from 'shared/ui'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import classNames from 'classnames'

type Props = {
  post: Post
  actionSlot?: ReactNode
  moderationSlot?: ReactNode
}
export const PostCardCabinet = (props: Props) => {
  const { post, actionSlot, moderationSlot } = props
  const to = PATH_PAGE.posts.slug(post.slug)

  return (
    <div className={classNames('post-card post-card--horizontal item-bg')}>
      <div className='item-bg__bg'></div>

      <div className='post-card__content'>
        <PostHead post={post} size='sm' />
        <h3 className='post-card__title h3 text-bold'>
          <Link to={to} className='text-link'>
            {post.title}
          </Link>
        </h3>

        <div className='post-card__description mt-10'>
          <p>{post.text}</p>
        </div>
        <div className='post-card__bottom mt-10'>
          <div className='post-card__link'>
            <Link to={to} className='text-link text-gray text-underline'>
              Preview
              <Icon type='arrow-long-right' right />
            </Link>
          </div>
          <div className='post-card__actions'>{actionSlot}</div>
        </div>
        <div className='post-card__moderations mt-10'>{moderationSlot}</div>
      </div>
    </div>
  )
}
