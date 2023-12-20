import React, { ReactNode } from 'react'
import { CommentCard } from '../comment-card/CommentCard'
import { Comment } from 'entities/comment'
import { Member } from 'entities/member'
import { QueryFlags } from 'shared/model'

type Props = {
  slug: string
  comments: Comment[]
  parentComment?: Comment
  currentMember?: Member
  renderComment?: (comment: Comment, parentComment?: Comment) => React.ReactNode
  afterSlot?: ReactNode
} & Partial<QueryFlags>

export const CommentList = (props: Props) => {
  const { comments, renderComment, afterSlot, isLoading, isFetching, isError, isSuccess, ...rest } = props

  const hasComments = Boolean(comments.length)

  return (
    <div className='comments__list'>
      {renderComment
        ? comments.map((c) => renderComment(c, props.parentComment))
        : comments.map((comment) => <CommentCard key={comment.id} isAuthor={false} {...rest} comment={comment} />)}

      {hasComments && afterSlot}
    </div>
  )
}
