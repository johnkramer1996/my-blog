import React from 'react'
import { Member } from 'entities/member'
import { Button, ButtonForm, Form, Icon, InputForm } from 'shared/ui'
import { Comment, useCreateCommentMutation } from 'entities/comment'
import { PATH_PAGE, notifySuccess } from 'shared/lib'
import { useUpdateCommentMutation } from 'entities/comment/api/comment.api'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { CreatePostFormSchema, createCommentFormSchema } from '../model/Create-post-form.schema'
import './CommentForm.scss'

type Props = {
  slug: string
  onComplete?: () => void
  currentMember?: Member
} & ({ type: 'create'; parentComment?: Comment; meta: { page?: number; limit?: number } } | { type: 'update'; comment: Comment })

export const CreateOrUpdateCommentForm = (props: Props) => {
  const { slug, onComplete, currentMember, type } = props

  const [createComment, createCommentState] = useCreateCommentMutation()
  const [updateComment, updateCommentState] = useUpdateCommentMutation()

  const onSubmit = async (data: CreatePostFormSchema) => {
    type === 'update'
      ? await updateComment({
          slug,
          commentId: props.comment.id,
          text: data.text,
          meta: { parentId: props.comment.parentId || undefined },
        }).unwrap()
      : await createComment({
          slug,
          parentId: props.parentComment?.id,
          meta: { parentParentId: props.parentComment?.parentId || undefined, ...props.meta },
          text: data.text,
        }).unwrap()
    notifySuccess('You have successfully created post')
    onComplete && onComplete()
  }

  return (
    <div>
      {currentMember ? (
        <Form
          validationSchema={createCommentFormSchema}
          defaultValues={{ text: type === 'update' ? props.comment.text : '' }}
          onSubmit={onSubmit}
          className={classNames('comment-form', { 'comment-form--loading': createCommentState.isLoading || updateCommentState.isLoading })}
        >
          {type === 'create' && (
            <Link to={PATH_PAGE.members.member.root(currentMember.login)} className='comment-form__image image image--cover image-circle image--author'>
              {currentMember.avatar && <img src={currentMember.avatar} alt='' />}
            </Link>
          )}
          <div className='comment-form__content'>
            <InputForm<CreatePostFormSchema> name='text' placeholder='Text message' />
            <ButtonForm>{type === 'create' ? 'Add' : 'Update'}</ButtonForm>
          </div>
        </Form>
      ) : (
        <SignInButton />
      )}
    </div>
  )
}

type SignInButtonProps = {
  returnUrl?: string
}

export const SignInButton = (props: SignInButtonProps) => {
  const { returnUrl } = props

  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.pathname)

  const onSignIn = () => {
    navigate(PATH_PAGE.signIn, {
      state: { returnUrl: returnUrl || location.pathname },
    })
  }

  return (
    <Button onClick={onSignIn} color='secondary' size='sm'>
      Sign in
      <Icon type='user' right />
    </Button>
  )
}
