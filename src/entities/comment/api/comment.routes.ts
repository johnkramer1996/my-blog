import { Vote } from 'shared/lib/vote'

export const commentRoutes = {
  FIND_COMMENTS: (slug: string) => `/posts/${slug}/comments`,
  FIND_CHILDREN_COMMENTS_BY_ID: (slug: string, commentId: string) => `/posts/${slug}/comments/${commentId}/children`,
  CREATE_COMMENT: (slug: string) => `/posts/${slug}/comments`,
  UPDATE_COMMENT: (slug: string, commentId: string) => `/posts/${slug}/comments/${commentId}`,
  DELETE_COMMENT: (slug: string, commentId: string) => `/posts/${slug}/comments/${commentId}`,
  TOGGLE_VOTE_COMMENT: (slug: string, commentId: string, vote: Vote) => `/posts/${slug}/comments/${commentId}/${vote}`,
}
