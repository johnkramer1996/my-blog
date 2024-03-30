import { PostDto } from '../dto/post.dto'
import { FindPostsParamsDto } from '../dto/find-post-params.dto'
import { UpdatePostDto } from '../dto/update-post.dto'
import { CreatePostDto } from '../dto/create-post.dto'
import { baseApi } from 'shared/api'
import { findAndUpdateVote, updateVote } from 'shared/lib'
import { postRoutes } from './post.routes'
import { Post } from '../model/post.model'
import { PostOrderBy } from '../model/post-order-by'
import { PostDetails } from '../model/post-detail.model'
import { COUNT_POST_TAG, POST_TAG } from 'shared/api/tags'
import { postMapper } from '../mapper/post.mapper'
import { postDetailsMapper } from '../mapper/post-details.mapper'
import { PostStatus } from '../model/post-status'
import { ModeratePostDto } from '../dto/moderate-post.dto'
import { Vote } from 'shared/lib/vote'
import { Paginated } from 'shared/model'
import { CountPostsByAuthUser } from '../model/count-posts-by-auth-user'

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    posts: builder.query<Paginated<Post>, FindPostsParamsDto>({
      query: (params) => ({ url: postRoutes.FIND_POSTS, params }),
      transformResponse: (response: Paginated<PostDto>) => ({ ...response, data: response.data.map(postMapper) }),
      providesTags: (result, error, arg) => {
        const ids = result?.data.map((post) => ({ type: POST_TAG, id: post.slug } as const))
        return [POST_TAG, { type: POST_TAG, id: arg.order }, ...(ids ?? [])]
      },
    }),
    postsByLogin: builder.query<Paginated<Post>, { login: string; limit?: number; page?: number }>({
      query: ({ login, ...params }) => ({ url: postRoutes.FIND_POSTS_BY_LOGIN(login), params }),
      transformResponse: (response: Paginated<PostDto>) => ({ ...response, data: response.data.map(postMapper) }),
      providesTags: (result, error, arg) => {
        const ids = result?.data.map((post) => ({ type: POST_TAG, id: post.slug } as const))
        return [POST_TAG, { type: POST_TAG, id: arg.login }, ...(ids ?? [])]
      },
    }),
    postDetails: builder.query<PostDetails, { slug: string }>({
      query: ({ slug }) => ({ url: postRoutes.FIND_POST_BY_SLUG(slug) }),
      transformResponse: postDetailsMapper,
      providesTags: (result, error, arg) => [{ type: POST_TAG, id: arg.slug }],
    }),
    postsByAuthUser: builder.query<Paginated<Post>, { status?: PostStatus; memberId?: string; limit?: number; page?: number }>({
      query: (params) => ({ url: postRoutes.FIND_POSTS_BY_AUTH_USER, params }),
      transformResponse: (response: Paginated<PostDto>) => ({ ...response, data: response.data.map(postMapper) }),
      providesTags: (result, error, arg) => {
        const ids = result?.data.map((post) => ({ type: POST_TAG, id: post.slug } as const))
        return [POST_TAG, { type: POST_TAG, id: (arg.status ?? '') + (arg.memberId ?? '') }, ...(ids ?? [])]
      },
    }),
    countPostsByAuthUser: builder.query<CountPostsByAuthUser, void>({
      query: () => ({ url: postRoutes.COUNT_POSTS_BY_AUTH_USER }),
      providesTags: [COUNT_POST_TAG],
    }),
    createPost: builder.mutation<{ slug: string }, CreatePostDto>({
      query: ({ body }) => ({ url: postRoutes.CREATE_POST, method: 'POST', body }),
      invalidatesTags: [POST_TAG],
    }),
    updatePost: builder.mutation<void, { slug: string } & UpdatePostDto>({
      query: ({ slug, body }) => ({ url: postRoutes.UPDATE_POST(slug), method: 'PATCH', body }),
      invalidatesTags: (result, error, arg) => [{ type: POST_TAG, id: arg.slug }],
    }),
    deletePost: builder.mutation<void, { slug: string }>({
      query: ({ slug }) => ({ url: postRoutes.DELETE_POST(slug), method: 'DELETE' }),
      invalidatesTags: [POST_TAG],
    }),
    moderatePost: builder.mutation<void, { slug: string } & ModeratePostDto>({
      query: ({ slug, ...body }) => ({ url: postRoutes.MODERATE_POST(slug), method: 'PATCH', body }),
      invalidatesTags: (result, error, arg) => [COUNT_POST_TAG, POST_TAG, { type: POST_TAG, id: arg.slug }],
    }),
    toggleVotePost: builder.mutation<
      { points: number },
      { slug: string; vote: Vote; meta: { login?: string; page?: number; limit?: number; order?: PostOrderBy; status?: PostStatus } }
    >({
      query: ({ slug, vote }) => ({ url: postRoutes.TOGGLE_VOTE_POST(slug, vote), method: 'POST' }),
      async onQueryStarted({ slug, vote, meta: { page, limit, order, login, status } }, { dispatch, queryFulfilled }) {
        const patchResultPosts = dispatch(
          postApi.util.updateQueryData('posts', { page, limit, order }, (draft) => findAndUpdateVote(draft.data, vote, (post) => post.slug === slug))
        )

        const patchResultPostsByAuthUser =
          status &&
          dispatch(
            postApi.util.updateQueryData('postsByAuthUser', { page, limit, status }, (draft) =>
              findAndUpdateVote(draft.data, vote, (post) => post.slug === slug)
            )
          )
        const patchResultPostsByLogin =
          login &&
          dispatch(
            postApi.util.updateQueryData('postsByLogin', { page, limit, login }, (draft) => findAndUpdateVote(draft.data, vote, (post) => post.slug === slug))
          )

        const patchResultPostDefails = dispatch(postApi.util.updateQueryData('postDetails', { slug }, (draft) => updateVote(draft, vote)))
        try {
          await queryFulfilled
        } catch {
          patchResultPosts.undo()
          patchResultPostsByAuthUser && patchResultPostsByAuthUser.undo()
          patchResultPostsByLogin && patchResultPostsByLogin.undo()
          patchResultPostDefails.undo()
        }
      },
    }),
  }),
})

export const {
  usePostsQuery,
  usePostsByLoginQuery,
  usePostDetailsQuery,
  usePostsByAuthUserQuery,
  useCountPostsByAuthUserQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useModeratePostMutation,
  useToggleVotePostMutation,
} = postApi
