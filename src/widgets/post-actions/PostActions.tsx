import React from 'react'
import { Post, PostOrderBy } from 'entities/post'
import { Icon, VoteSize } from 'shared/ui'
import { AddVoteToPostGroupIcon } from 'features/post/add-vote-to-post'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { DeletePostIcon } from 'features/post/delete-post'
import { MemberRoleEntity } from 'shared/model/member-role-entity'
import { IconSize } from 'shared/ui'
import { PostStatus } from 'entities/post/model/post-status'

type Props = {
  post: Post
  editPermission?: boolean
  deletePermission?: boolean
  iconSize?: IconSize
  size?: VoteSize
  meta?: {
    page?: number
    limit?: number
    order?: PostOrderBy
    login?: string
    status?: PostStatus
  }
}

export const PostActions = (props: Props) => {
  const { post, editPermission, deletePermission, iconSize, size, meta = {} } = props

  return (
    <>
      {editPermission && (
        <>
          <Link to={PATH_PAGE.cabinet.posts.updatePost(props.post.slug)}>
            <Icon type='pencil-edit' color='primary' size={iconSize} />
          </Link>
          {post.status === 'trash' && deletePermission && <DeletePostIcon slug={props.post.slug} iconSize={iconSize} />}
        </>
      )}
      {post.status === 'publish' && <AddVoteToPostGroupIcon post={post} size={size} meta={meta} />}
    </>
  )
}
