import { Form } from 'shared/ui'
import { useCreatePostMutation } from 'entities/post/api/post.api'
import { CreatePostFormSchema, createPostFormSchema } from '../model/create-post-form.schema'
import { notifySuccess, objectToFormData } from 'shared/lib'
import { PostEditorAction } from './PostEditorAction'
import { PostForm } from 'entities/post'

type CreatePostFormProps = {
  onComplete: (slug: string) => void
}

export const CreatePostForm = (props: CreatePostFormProps) => {
  const { onComplete } = props

  const [createPost] = useCreatePostMutation()

  const onSubmit = async (data: CreatePostFormSchema) => {
    const body = objectToFormData(data)

    const response = await createPost({ body }).unwrap()
    notifySuccess('You have successfully created post')
    onComplete(response.slug)
  }

  return (
    <Form validationSchema={createPostFormSchema} onSubmit={onSubmit} className='row flex-start'>
      <PostForm actionsSlot={<PostEditorAction />} />
    </Form>
  )
}
