import React from 'react'
import { Post, PostOrderBy } from 'entities/post'
import { useToggleVotePostMutation } from 'entities/post/api/post.api'
import { VoteGroupIcon, VoteSize } from 'shared/ui'
import { notifySuccess, notifyUnknown } from 'shared/lib'
import { useCheckAuth } from 'features/session/sign-in-and-up'
import { Vote } from 'shared/lib/vote'

type Props = {
  post: Post
  meta: {
    limit?: number
    page?: number
    order?: PostOrderBy
    login?: string
  }
  size?: VoteSize
  className?: string
}

export const AddVoteToPostButtonGroup = (props: Props) => {
  const { post, meta, size, className } = props
  const [toggleVotePostFn] = useToggleVotePostMutation()
  const [, checkAuth] = useCheckAuth()

  const { slug, wasUpvotedByMe, wasDownvotedByMe, points } = post

  const onTogglePostVote = (vote: Vote) => async () => {
    const togglePostVote = async () => {
      try {
        await toggleVotePostFn({ slug, vote, meta }).unwrap()
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

  return <VoteGroupIcon {...{ wasUpvotedByMe, wasDownvotedByMe, points, up, down, size, className }} />
}
