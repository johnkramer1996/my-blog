import { selectIsAuth } from 'entities/session'
import { useAppSelector, useAlertPopup } from 'shared/model'
import { useSignInPopup } from './use-sign-in-popup'

export const useCheckAuth = () => {
  const isAuth = useAppSelector(selectIsAuth)
  const alertPopup = useAlertPopup()
  const popup = useSignInPopup()

  const checkAuth = (complete?: () => void) => {
    if (isAuth) return true
    alertPopup.show({
      title: 'Sign in?',
      buttonText: 'Sign in',
      onButtonClick() {
        alertPopup.remove()
        popup.show(complete)
      },
    })
    return false
  }

  return [isAuth, checkAuth] as const
}
