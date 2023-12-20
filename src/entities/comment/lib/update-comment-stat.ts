import { Comment } from '../model/comment.model'

export const updateCommentStat = (data: Comment[], parentId: string, count: number) => {
  const comment = data.find((c) => c.id === parentId)
  if (!comment) return
  comment.countChild += count
}
