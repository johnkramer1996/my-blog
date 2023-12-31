import { Navigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { MemberRole, useAppSelector } from 'shared/model'
import { ReactElement } from 'react'
import { hasPermissionByMember, memberApi } from 'entities/member'

type Props = {
  permission: MemberRole[]
  children: ReactElement
}

export const PermissionGuard = ({ permission, children }: Props): ReactElement => {
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())

  if (permission.length && !hasPermissionByMember(permission, currentMember)) return <Navigate to={PATH_PAGE.root} replace />

  return children
}
