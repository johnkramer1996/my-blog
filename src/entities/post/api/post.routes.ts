import { Vote } from 'shared/lib'

export const postRoutes = {
  FIND_POSTS: '/posts',
  FIND_POSTS_BY_AUTH_USER: '/cabinet/posts',
  COUNT_POSTS_BY_AUTH_USER: '/cabinet/posts/count',
  FIND_POSTS_BY_LOGIN: (login: string) => `/members/${login}/posts`,
  FIND_POST_BY_SLUG: (slug: string) => `/posts/${slug}`,
  CREATE_POST: `/posts/`,
  UPDATE_POST: (slug: string) => `/posts/${slug}`,
  DELETE_POST: (slug: string) => `/posts/${slug}`,
  MODERATE_POST: (slug: string) => `/posts/${slug}/moderate`,
  TOGGLE_VOTE_POST: (slug: string, vote: Vote) => `/posts/${slug}/${vote}`,
}
