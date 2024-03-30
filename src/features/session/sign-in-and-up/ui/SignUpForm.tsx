import { selectIsAuth } from 'entities/session'
import { notifySuccess } from 'shared/lib/notify'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { useCallback } from 'react'
import { Button, ButtonForm, Form, InputForm, SectionTitle } from 'shared/ui'
import classNames from 'classnames'
import { signUpThunk } from '../model/sign-up.thunk'
import { SignUpFormSchema, signUpFormSchema } from '../model/sign-up-form-schema'

type Props = {
  onComplete?: () => void
  onToSignIn?: () => void
  className?: string
}

export const SignUpForm = (props: Props) => {
  const dispatch = useAppDispatch()
  const isAuth = useAppSelector(selectIsAuth)

  const onSubmitHandler = useCallback(
    async (data: SignUpFormSchema) => {
      await dispatch(signUpThunk(data)).unwrap()
      props.onComplete && props.onComplete()
      notifySuccess('You have successfully registered')
    },
    [dispatch, props]
  )

  return (
    <>
      {isAuth ? (
        <div className='item-bg'>
          <div className='item-bg__bg'></div>
          <SectionTitle subtitle='You are authorized'></SectionTitle>
        </div>
      ) : (
        <Form<SignUpFormSchema>
          onSubmit={onSubmitHandler}
          validationSchema={signUpFormSchema}
          // defaultValues={{ login: 'login', email: 'login@gmail.com', password: '12345678' }}
          className={classNames('', props.className)}
        >
          <InputForm<SignUpFormSchema> type='text' name='login' label='Login' />
          <InputForm<SignUpFormSchema> type='text' name='email' label='Email' />
          <InputForm<SignUpFormSchema> type='password' name='password' label='Password' />
          <ButtonForm>Sign up</ButtonForm>
          <div className='form__link'>
            <Button onClick={props.onToSignIn} link>
              Need an account?
            </Button>
          </div>
        </Form>
      )}
    </>
  )
}
