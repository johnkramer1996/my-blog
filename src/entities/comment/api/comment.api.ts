import { baseApi } from 'shared/api'
import { CommentDto } from '../dto/comment.dto'
import { UpdateCommentDto } from '../dto/update-comment.dto'
import { CreateCommentDto } from '../dto/create-comment.dto'
import { Paginated } from 'shared/model'
import { commentRoutes } from './comment.routes'
import { Comment } from '../model/comment.model'
import { commentMapper } from '../mapper/comment.mapper'
import { CHILDREN_COMMENT_TAG, COMMENT_TAG } from 'shared/api/tags'
import { updateCommentStat } from '../lib/update-comment-stat'
import { findAndUpdateVote } from 'shared/lib/vote/find-and-update-vote'
import { postApi } from 'entities/post'
import { Vote } from 'shared/lib/vote'

export const commentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    comments: builder.query<Paginated<Comment>, { slug: string; limit?: number; page?: number }>({
      query: ({ slug, ...params }) => ({ url: commentRoutes.FIND_COMMENTS(slug), params }),
      transformResponse: (response: Paginated<CommentDto>) => ({ ...response, data: response.data.map(commentMapper) }),
      providesTags: (result, error, arg) => {
        return [COMMENT_TAG, { type: COMMENT_TAG, id: arg.slug }]
      },
    }),
    childrenComment: builder.query<Comment[], { slug: string; commentId: string }>({
      query: ({ slug, commentId }) => ({ url: commentRoutes.FIND_CHILDREN_COMMENTS_BY_ID(slug, commentId) }),
      transformResponse: (response: CommentDto[]) => response.map(commentMapper),
      providesTags: (result, error, arg) => {
        return [COMMENT_TAG, CHILDREN_COMMENT_TAG, { type: CHILDREN_COMMENT_TAG, id: arg.slug + arg.commentId }]
      },
    }),
    createComment: builder.mutation<{ id: string }, { slug: string; meta: { parentParentId?: string; page?: number; limit?: number } } & CreateCommentDto>({
      query: ({ slug, meta, ...body }) => ({ url: commentRoutes.CREATE_COMMENT(slug), method: 'POST', body }),
      invalidatesTags: (result, error, arg) => {
        return [arg.parentId ? { type: CHILDREN_COMMENT_TAG, id: arg.slug + arg.parentId } : { type: COMMENT_TAG, id: arg.slug }]
      },
      async onQueryStarted({ slug, parentId, meta: { parentParentId, page, limit } }, { dispatch, queryFulfilled }) {
        const patchResult = !parentId
          ? null
          : !parentParentId
          ? dispatch(commentApi.util.updateQueryData('comments', { slug, page, limit }, (draft) => updateCommentStat(draft.data, parentId, 1)))
          : dispatch(commentApi.util.updateQueryData('childrenComment', { slug, commentId: parentParentId }, (draft) => updateCommentStat(draft, parentId, 1)))

        const patchResultPostDefails = dispatch(
          postApi.util.updateQueryData('postDetails', { slug }, (draft) => {
            draft.totalNumComments++
          })
        )

        queryFulfilled.catch(() => {
          patchResult && patchResult.undo()
          patchResultPostDefails.undo()
        })
      },
    }),
    updateComment: builder.mutation<{ id: string }, { slug: string; commentId: string; meta: { parentId?: string } } & UpdateCommentDto>({
      query: ({ slug, commentId, ...body }) => ({ url: commentRoutes.UPDATE_COMMENT(slug, commentId), method: 'PATCH', body }),
      invalidatesTags: (result, error, arg) => {
        return [arg.meta.parentId ? { type: CHILDREN_COMMENT_TAG, id: arg.slug + arg.meta.parentId } : { type: COMMENT_TAG, id: arg.slug }]
      },
    }),
    deleteComment: builder.mutation<
      void,
      { slug: string; commentId: string; meta: { parentId?: string; parentParentId?: string; page?: number; limit?: number } }
    >({
      query: ({ slug, commentId }) => ({ url: commentRoutes.DELETE_COMMENT(slug, commentId), method: 'DELETE' }),
      invalidatesTags: (result, error, arg) => {
        return [arg.meta.parentId ? { type: CHILDREN_COMMENT_TAG, id: arg.slug + arg.meta.parentId } : { type: COMMENT_TAG, id: arg.slug }]
      },
      async onQueryStarted({ slug, meta }, { dispatch, queryFulfilled }) {
        const { parentId, parentParentId } = meta
        if (!parentId) return

        const patchResult = !parentParentId
          ? dispatch(commentApi.util.updateQueryData('comments', { slug }, (draft) => updateCommentStat(draft.data, parentId, -1)))
          : dispatch(commentApi.util.updateQueryData('childrenComment', { slug, commentId: parentParentId }, (draft) => updateCommentStat(draft, parentId, -1)))

        queryFulfilled.catch(patchResult.undo)
      },
    }),
    toggleVoteComment: builder.mutation<
      { points: number },
      { slug: string; commentId: string; vote: Vote; meta: { parentId?: string; page?: number; limit?: number } }
    >({
      query: ({ slug, commentId, vote }) => ({ url: commentRoutes.TOGGLE_VOTE_COMMENT(slug, commentId, vote), method: 'POST' }),
      async onQueryStarted({ slug, commentId, vote, meta: { parentId, page, limit } }, { dispatch, queryFulfilled }) {
        const patchResult = !parentId
          ? dispatch(
              commentApi.util.updateQueryData('comments', { slug, page, limit }, (draft) => findAndUpdateVote(draft.data, vote, (c) => c.id === commentId))
            )
          : dispatch(
              commentApi.util.updateQueryData('childrenComment', { slug, commentId: parentId }, (draft) =>
                findAndUpdateVote(draft, vote, (c) => c.id === commentId)
              )
            )

        queryFulfilled.catch(patchResult.undo)
      },
    }),
  }),
})

export const {
  useCommentsQuery,
  useLazyChildrenCommentQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useToggleVoteCommentMutation,
} = commentApi
