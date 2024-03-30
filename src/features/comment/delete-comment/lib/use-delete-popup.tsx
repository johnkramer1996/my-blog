import { notifySuccess, notifyUnknown } from 'shared/lib'
import React from 'react'
import { useConfirmPopup } from 'shared/model'
import { useDeleteCommentMutation } from 'entities/comment/api/comment.api'
import { Comment } from 'entities/comment'

export const useDeletePopup = (
  params: { slug: string; comment: Comment; parentComment?: Comment; meta: { parentId?: string; parentParentId?: string; page?: number; limit?: number } },
  onComplete?: () => void
) => {
  const [deleteComment] = useDeleteCommentMutation()
  const confirmRemoveModal = useConfirmPopup()

  return (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    confirmRemoveModal.show({
      title: 'Are you really want remove comment?',
      onConfirm: async () => {
        try {
          await deleteComment({ slug: params.slug, commentId: params.comment.id, meta: params.meta }).unwrap()
          onComplete && onComplete()
          notifySuccess(`You have successfully deleted post`)
        } catch (e) {
          notifyUnknown(e)
        } finally {
          confirmRemoveModal.remove()
        }
      },
    })
  }
}
