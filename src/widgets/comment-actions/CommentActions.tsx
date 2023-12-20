import React from 'react'
import { Icon } from 'shared/ui'
import { Comment } from 'entities/comment'
import { DeleteCommentIcon } from 'features/comment/delete-comment'
import { AddVoteToCommentButtonGroup } from 'features/comment/add-vote-to-comment'
import { MemberRoleEntity } from 'shared/model'

type Props = {
  slug: string
  comment: Comment
  parentComment?: Comment
  role: MemberRoleEntity
  onEdit?: () => void
  meta: {
    page?: number
    limit?: number
  }
}

export const CommentActions = (props: Props) => {
  const { slug, comment, parentComment, role, onEdit, meta } = props
  return (
    <>
      {role === 'owner' && (
        <>
          <button onClick={onEdit}>
            <Icon type='pencil-edit' color='primary' />
          </button>
          <DeleteCommentIcon slug={slug} comment={comment} parentComment={parentComment} meta={meta} />
        </>
      )}
      <AddVoteToCommentButtonGroup slug={slug} comment={comment} meta={meta} />
    </>
  )
}
