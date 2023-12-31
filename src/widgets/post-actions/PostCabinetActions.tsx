import { Post } from 'entities/post'
import { MemberRoleEntity } from 'shared/model'
import { Icon } from 'shared/ui'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { DeletePostIcon } from 'features/post/delete-post'

type Props = {
  post: Post
  editPermission?: boolean
  deletePermission?: boolean
}
export const PostCabinetActions = (props: Props) => {
  const { post, editPermission, deletePermission } = props

  return (
    <>
      {editPermission && (
        <Link to={PATH_PAGE.cabinet.posts.updatePost(post.slug)}>
          <Icon type='pencil-edit' color='primary' />
        </Link>
      )}
      {post.status === 'trash' && deletePermission && <DeletePostIcon slug={post.slug} />}
    </>
  )
}
