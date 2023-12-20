import { Form } from 'shared/ui'
import { DefaultValues } from 'react-hook-form'
import { useUpdatePostMutation } from 'entities/post/api/post.api'
import { UpdatePostFormSchema, updatePostFormSchema } from '../model/update-post-form.schema'
import { notifySuccess, objectToFormData } from 'shared/lib'
import { PostEditorAction } from '../../create-post/ui/PostEditorAction'
import { PostForm } from 'entities/post'

type Props = {
  slug: string
  onComplete: () => void
  defaultValues?: DefaultValues<UpdatePostFormSchema>
}

export const UpdatePostForm = (props: Props) => {
  const { onComplete, defaultValues, slug } = props
  const [updatePost] = useUpdatePostMutation()

  const onSubmit = async (data: UpdatePostFormSchema) => {
    const body = objectToFormData(data)

    await updatePost({ body, slug }).unwrap()
    notifySuccess('You have successfully updated post')
    onComplete()
  }

  return (
    <Form validationSchema={updatePostFormSchema} onSubmit={onSubmit} defaultValues={defaultValues} className='row' notResetAfterSubmit>
      <PostForm actionsSlot={<PostEditorAction slug={slug} />} />
    </Form>
  )
}
