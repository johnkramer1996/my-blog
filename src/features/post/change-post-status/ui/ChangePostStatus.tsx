import { Post } from 'entities/post'
import { Button } from 'shared/ui'
import { PostStatus } from 'entities/post/model/post-status'
import { useModeratePostMutation } from 'entities/post/api/post.api'
import { notifySuccess, notifyUnknown } from 'shared/lib'

type P3 = {
  post: Post
}
export const ChangePostStatus = (props: P3) => {
  const { post } = props
  const [moderateFn] = useModeratePostMutation()
  const changeStatus = (slug: string, status: PostStatus) => async (e: React.MouseEvent<HTMLElement>) => {
    try {
      await moderateFn({ slug, status }).unwrap()

      notifySuccess('success')
    } catch (e) {
      notifyUnknown(e)
    }
  }

  return (
    <>
      <Button color='success' onClick={changeStatus(post.slug, 'publish')} disabled={post.status === 'publish'} maxWidth>
        Publish
      </Button>
      <Button color='secondary' onClick={changeStatus(post.slug, 'draft')} disabled={post.status === 'draft'} maxWidth>
        Draft
      </Button>
      <Button color='dangerous' onClick={changeStatus(post.slug, 'trash')} disabled={post.status === 'trash'} maxWidth>
        Trash
      </Button>
    </>
  )
}
