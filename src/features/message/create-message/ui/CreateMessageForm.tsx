import { Button, Form, InputForm } from 'shared/ui'
import { notifySuccess } from 'shared/lib'
import { useCreateMessageMutation } from 'entities/message'
import { createMessageFormSchema, CreateMessageFormSchema } from '../model/create-message-form.schema'

type Props = {
  toMemberId: string
  onComplete?: () => void
  onChange?: (name: string, value: string) => void
}

export const CreateMessageForm = (props: Props) => {
  const { toMemberId, onComplete, onChange } = props
  const [createMessageFn] = useCreateMessageMutation()

  const onSubmitHandler = async (data: CreateMessageFormSchema) => {
    const { id: messageId } = await createMessageFn({ toMemberId, ...data }).unwrap()
    onComplete && onComplete()
    notifySuccess('success')
  }

  return (
    <Form onSubmit={onSubmitHandler} validationSchema={createMessageFormSchema} className='chat__new'>
      <InputForm<CreateMessageFormSchema> name='message' onChange={onChange} />
      <Button>Send</Button>
    </Form>
  )
}
