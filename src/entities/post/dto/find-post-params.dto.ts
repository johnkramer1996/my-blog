export type FindPostsParamsDto = {
  limit?: number
  page?: number
  offset?: number
  order?: 'popular' | 'recent'
}
