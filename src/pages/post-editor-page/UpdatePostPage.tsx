import { useNavigate, useParams } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { Preloader, SectionTitle } from 'shared/ui'
import { CreatePostForm, UpdatePostForm } from 'features/post/create-post'
import { usePostDetailsQuery } from 'entities/post'
import { useMemo } from 'react'
import { errorHandler } from 'shared/lib'

export const UpdatePostPage = () => {
  const { slug } = useParams() as { slug: string }
  const { data: post, isSuccess, isLoading, error } = usePostDetailsQuery({ slug })

  const navigate = useNavigate()

  const defaultValues = useMemo(() => ({ ...post, image: '' as unknown as undefined, imagePreview: post?.image }), [post])

  if (isLoading) return <Preloader />
  if (!isSuccess) return errorHandler(error)

  const onComplete = () => {
    navigate(-1)
  }

  return (
    <section className='section'>
      <div className='container'>
        <SectionTitle className='mb-30' left>
          Edit post
        </SectionTitle>

        <UpdatePostForm onComplete={onComplete} slug={slug} defaultValues={defaultValues} />
      </div>
    </section>
  )
}

export const CreatePostPage = () => {
  const navigate = useNavigate()

  const onComplete = (slug: string) => {
    navigate(PATH_PAGE.posts.slug(slug))
  }

  return (
    <section className='section'>
      <div className='container'>
        <SectionTitle className='mb-30' left>
          Create
        </SectionTitle>

        <CreatePostForm onComplete={onComplete} />
      </div>
    </section>
  )
}
