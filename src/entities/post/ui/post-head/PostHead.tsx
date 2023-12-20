import React, { ReactNode } from 'react'
import { Author, Icon } from 'shared/ui'
import { Post } from 'entities/post'
import { PATH_PAGE } from 'shared/lib'
import './PostHead.scss'
import classNames from 'classnames'

type Props = {
  post: Post
  size?: 'sm' | 'md'
  actionsSlot?: ReactNode
}
export const PostHead = (props: Props) => {
  const { post, size, actionsSlot } = props
  return (
    <div className={classNames('post-head', size && `post-head--${size}`)}>
      <ul className='post-head__meta'>
        <li className='post-head__meta-item'>
          <Author
            to={PATH_PAGE.profile.user.root(post.member.login)}
            image={post.member.avatar}
            name={post.member.login}
            status={post.member.status}
            size='sm'
          />
        </li>
        <li className='post-head__meta-item'>
          <Icon type='date' left />
          {post.createdAt}
        </li>
        <li className='post-head__meta-item'>
          <Icon type='comment' left />
          {post.totalNumComments}
        </li>
      </ul>
      <div className='post-head__actions'>{actionsSlot}</div>
    </div>
  )
}
