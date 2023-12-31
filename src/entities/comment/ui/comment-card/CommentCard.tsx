import { ReactNode, useState } from 'react'
import { Button, Icon } from 'shared/ui'
import { Comment, useLazyChildrenCommentQuery } from 'entities/comment'
import { Member } from 'entities/member'
import { CommentList } from 'entities/comment'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import './CommentCard.scss'
import { CommentCardState } from './CommentCardState'

export type Props = {
  slug: string
  comment: Comment
  isAuthor: boolean
  currentMember?: Member
  actionsSlot?: (state: CommentCardState) => ReactNode
  replySlot?: (state: CommentCardState) => ReactNode
  createSlot?: (state: CommentCardState) => ReactNode
  renderChild?: (comment: Comment, parentComment?: Comment) => ReactNode
}

export const CommentCard = (props: Props) => {
  const { slug, comment, isAuthor, currentMember, actionsSlot, replySlot, createSlot, renderChild } = props

  const [findChildrenComment, { data: childComments }] = useLazyChildrenCommentQuery()
  const [isReplying, setIsReplying] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [visibleChilden, setVisibleChilden] = useState(false)
  const [visibleBtnMore, setVisibleBtnMore] = useState(true)

  const onFindChildrenComment = (slug: string, commentId: string) => {
    visibleBtnMore
      ? findChildrenComment({ slug, commentId })
          .unwrap()
          .then(() => {
            setVisibleBtnMore(false)
            setVisibleChilden(true)
          })
      : setVisibleChilden(true)
  }

  const state: CommentCardState = {
    isReplying,
    setIsReplying,
    isEditing,
    setIsEditing,
    visibleChilden,
    setVisibleChilden,
    visibleBtnMore,
    setVisibleBtnMore,
    childComments,
    onFindChildrenComment,
  }

  return (
    <div className='comment-card'>
      <Link to={PATH_PAGE.members.member.root(comment.member.login)} className='comment-card__image image image--cover image-circle image--author'>
        {comment.member.avatar && <img src={comment.member.avatar} alt='' />}
      </Link>
      <div className='comment-card__content'>
        <div className='comment-card__head'>
          <div className='comment-card__name h4 text-bold'>
            {comment.member.login} {isAuthor && <span className='comment-card__author'>Author</span>}
          </div>
          <div className='comment-card__actions'>{actionsSlot && actionsSlot(state)}</div>
        </div>
        {isEditing ? createSlot && createSlot(state) : <div className='comment-card__text mt-10'>{comment.text}</div>}

        <div className='comment-card__bottom mt-10'>
          <div className='comment-card__date'>{comment.createdAt}</div>
          <Button className='comment-card__link' onClick={() => setIsReplying((p) => !p)} link>
            Reply
          </Button>
        </div>
        {isReplying && replySlot && replySlot(state)}
        {Boolean(comment.countChild) && !visibleChilden && (
          <>
            <div className='mt-10'>
              <Button className='comment-card__link' onClick={() => onFindChildrenComment(slug, comment.id)} link>
                Show {comment.countChild} more comments
              </Button>
            </div>
          </>
        )}
        {childComments && Boolean(childComments.length) && visibleChilden && (
          <div>
            <Button onClick={() => setVisibleChilden(false)} className='mt-10' link>
              Hide Replies
            </Button>

            {childComments && (
              <CommentList slug={slug} currentMember={currentMember} comments={childComments} parentComment={comment} renderComment={renderChild} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
