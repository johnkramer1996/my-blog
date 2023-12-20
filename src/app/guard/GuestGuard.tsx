import { selectIsAuth } from 'entities/session'
import { type ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'shared/model'
import { PATH_PAGE } from 'shared/lib'

export type Props = {
  children: ReactElement
}

export const GuestGuard = ({ children }: Props): ReactElement => {
  const isAuth = useAppSelector(selectIsAuth)

  if (!isAuth) return <Navigate to={PATH_PAGE.root} replace />

  return children
}
