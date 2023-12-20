import React from 'react'
import { Comment } from 'entities/comment'

export type CommentCardState = {
  isReplying: boolean
  setIsReplying: React.Dispatch<React.SetStateAction<boolean>>
  isEditing: boolean
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  visibleChilden: boolean
  setVisibleChilden: React.Dispatch<React.SetStateAction<boolean>>
  visibleBtnMore: boolean
  setVisibleBtnMore: React.Dispatch<React.SetStateAction<boolean>>
  childComments?: Comment[]
  onFindChildrenComment: (slug: string, commentId: string) => void
}
