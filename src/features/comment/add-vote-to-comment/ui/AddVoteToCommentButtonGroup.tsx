import React from 'react'
import { VoteGroupIcon } from 'shared/ui'
import { Comment } from 'entities/comment'
import { useCheckAuth } from 'features/session/sign-in-and-up'
import { notifySuccess, notifyUnknown } from 'shared/lib'
import { useToggleVoteCommentMutation } from 'entities/comment/api/comment.api'
import { Vote } from 'shared/lib/vote'

type AddVoteToPostButtonGroupProps = {
  slug: string
  comment: Comment
  meta: {
    page?: number
    limit?: number
  }
}

export const AddVoteToCommentButtonGroup = (props: AddVoteToPostButtonGroupProps) => {
  const { slug, comment, meta } = props
  const [toggleVotePostFn] = useToggleVoteCommentMutation()
  const [, checkAuth] = useCheckAuth()

  const { wasUpvotedByMe, wasDownvotedByMe, points } = comment

  const onTogglePostVote = (vote: Vote) => async () => {
    const togglePostVote = async () => {
      try {
        await toggleVotePostFn({ slug, vote, commentId: comment.id, meta: { parentId: comment.parentId || undefined, ...meta } }).unwrap()
        notifySuccess(`You have successfully ${vote}d post`)
      } catch (e) {
        notifyUnknown(e)
      }
    }
    if (!checkAuth(togglePostVote)) return
    togglePostVote()
  }

  const up = onTogglePostVote(wasUpvotedByMe ? 'downvote' : 'upvote')
  const down = onTogglePostVote(wasDownvotedByMe ? 'upvote' : 'downvote')

  return <VoteGroupIcon {...{ wasUpvotedByMe, wasDownvotedByMe, points, up, down }} />
}
