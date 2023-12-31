import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Post } from 'entities/post/model/post.model'
import { PATH_PAGE, notify, notifySuccess } from 'shared/lib'
import { ReactNode } from 'react'
import { PostHead } from '../post-head/PostHead'
import { Button, Icon } from 'shared/ui'
import './PostCard.scss'

export type PostCardType = 'horizontal' | 'vertical'

type Props = {
  post: Post
  type?: PostCardType
  actionsSlot?: ReactNode
  isModeration?: boolean
  className?: string
}

export const PostCard = (props: Props) => {
  const { post, type = 'horizontal', actionsSlot, className } = props

  const to = PATH_PAGE.posts.slug(post.slug)
  const horizontal = type === 'horizontal'

  return (
    <div className={classNames('post-card item-bg', `post-card--${type}`, className)}>
      <div className='item-bg__bg'></div>
      <Link to={to} className='post-card__image image image--cover image--radius'>
        <img src={post.image} alt='' />
        <div className='image-hover'>
          <div className='image-hover__text'>Read more</div>
        </div>
      </Link>
      <div className='post-card__content'>
        <PostHead post={post} size='sm' actionsSlot={horizontal && actionsSlot} />
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
              Read more
              <Icon type='arrow-long-right' right />
            </Link>
          </div>
          {!horizontal && <div className='post-card__actions'>{actionsSlot}</div>}
        </div>
        <div className='post-card__modaration'></div>
      </div>
    </div>
  )
}
