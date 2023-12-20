import { VoteEntity, updateVote } from './update-vote'
import { Vote } from './vote'

export const findAndUpdateVote = <T extends VoteEntity>(posts: T[], vote: Vote, find: (el: T) => boolean) => {
  const entity = posts.find(find)
  if (!entity) return

  updateVote(entity, vote)
}
