import { SignInForm, SignUpForm } from 'features/session/sign-in-and-up'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { SectionTitle } from 'shared/ui'

export const SignInPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const onCompleteSignIn = useCallback(() => {
    navigate(location.state?.returnUrl ?? PATH_PAGE.root)
  }, [navigate, location])

  const onCompleteSignUp = useCallback(() => {
    navigate(PATH_PAGE.signIn)
  }, [navigate])

  const onToSignUp = () => navigate(PATH_PAGE.signUp)
  const onToSignIn = () => navigate(PATH_PAGE.signIn)

  const isSignIn = location.pathname === PATH_PAGE.signIn

  const className = 's-sign-in__form col-lg-6 form form--bg ml-auto mr-auto'

  return (
    <section className='section s-sign-in'>
      <div className='container'>
        <SectionTitle className='mb-30'>{isSignIn ? 'Sign in' : 'Sign up'}</SectionTitle>
        {isSignIn ? (
          <SignInForm onComplete={onCompleteSignIn} className={className} onToSignUp={onToSignUp} />
        ) : (
          <SignUpForm onComplete={onCompleteSignUp} className={className} onToSignIn={onToSignIn} />
        )}
      </div>
    </section>
  )
}
