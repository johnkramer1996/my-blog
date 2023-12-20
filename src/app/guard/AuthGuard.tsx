import { selectIsAuth } from 'entities/session'
import { type ReactElement } from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'shared/model'

export type Props = {
  children: ReactElement
}

export const AuthGuard = ({ children }: Props): ReactElement => {
  const isAuth = useAppSelector(selectIsAuth)

  if (isAuth) return <Navigate to='/' replace />

  return children
}
