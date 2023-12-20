import { Vote } from './vote'

export type VoteEntity = { points: number; wasUpvotedByMe: boolean; wasDownvotedByMe: boolean }

export const updateVote = <T extends VoteEntity>(post: T, vote: Vote) => {
  const currentVote = post.wasUpvotedByMe ? 'upvote' : post.wasDownvotedByMe ? 'downvote' : null

  const isUpvote = vote === 'upvote'
  const isDownvote = vote === 'downvote'

  if (!currentVote) {
    post.points += isUpvote ? 1 : -1
    post.wasUpvotedByMe = isUpvote
    post.wasDownvotedByMe = isDownvote
    return
  }
  if ((isUpvote && currentVote === 'downvote') || (isDownvote && currentVote === 'upvote')) {
    post.points += isUpvote ? 1 : -1
    post.wasUpvotedByMe = false
    post.wasDownvotedByMe = false
    return
  }
}
