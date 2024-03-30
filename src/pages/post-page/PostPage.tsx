import { Preloader, SectionTitle } from 'shared/ui'
import { PostHead, usePostDetailsQuery } from 'entities/post'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'shared/model'
import { PostActions } from 'widgets'
import { errorHandler, getMemberRole } from 'shared/lib'
import { CommentsPost } from './CommentsPost'
import { memberApi } from 'entities/member'
import './PostPage.scss'

export const PostPage = () => {
  const { slug } = useParams() as { slug: string }
  const postState = usePostDetailsQuery({ slug })
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())

  if (postState.isLoading) return <Preloader />

  if (!postState.isSuccess) return errorHandler(postState.error)

  const { data: post } = postState

  const role = getMemberRole(currentMember, post.member)
  const hasEditPermission = currentMember?.editPermission || role === 'owner'
  const hasDeletePermission = currentMember?.deletePermission || role === 'owner'

  return (
    <>
      <section className='section s-post'>
        <div className='container'>
          <SectionTitle subtitle={post.status === 'draft' ? 'Post is draft' : post.status === 'trash' ? 'Post is trash' : ''} className='mb-50' left>
            {post.title}
          </SectionTitle>

          <div className='post'>
            <PostHead post={post} actionsSlot={<PostActions post={post} editPermission={hasEditPermission} deletePermission={hasDeletePermission} />} />
            <div className='post__image image image--cover mt-20'>
              <img src={post.image} alt='' />
            </div>
            <div className='post__content'>
              <p>{post.text}</p>
            </div>
          </div>
        </div>
      </section>
      <CommentsPost post={post} total={post.totalNumComments} />
    </>
  )
}
