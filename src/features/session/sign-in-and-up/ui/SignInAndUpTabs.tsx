import { selectIsAuth } from 'entities/session'
import { SignInForm, SignUpForm } from 'features/session/sign-in-and-up'
import { useAppSelector } from 'shared/model'
import { Tabs } from 'shared/ui'

export type Props = {
  onComplete?: () => void
}

export const SignInAndUpTabs = (props: Props) => {
  const isAuth = useAppSelector(selectIsAuth)

  if (isAuth) return <h3 className='h3 text-bold'>We already auth</h3>

  return (
    <>
      <Tabs tabs={['Sign in', 'Sign up']}>
        {(setActiveTab) => <SignInForm onComplete={props.onComplete} onToSignUp={() => setActiveTab(1)} />}
        {(setActiveTab) => <SignUpForm onComplete={props.onComplete} onToSignIn={() => setActiveTab(0)} />}
      </Tabs>
    </>
  )
}
