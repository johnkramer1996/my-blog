import { useDeletePostMutation } from 'entities/post/api/post.api'
import { notifySuccess, notifyUnknown } from 'shared/lib'
import React from 'react'
import { useConfirmPopup } from 'shared/model'

export const useDeletePopup = (params: { slug: string }, onComplete?: () => void) => {
  const [deletePost] = useDeletePostMutation()
  const confirmRemoveModal = useConfirmPopup()

  return (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    confirmRemoveModal.show({
      title: 'Are you really want remove post?',
      onConfirm: async () => {
        try {
          await deletePost(params).unwrap()
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
