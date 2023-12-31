import { Member } from '../model/member.model'
import { MemberRole } from '../../../shared/model/member-role'

export const hasPermissionByMember = (roles: MemberRole[], member: Member | undefined) =>
  roles.length === 0 || (member && roles.some((role) => member.roles.includes(role)))
export const hasPermisisonByRoles = (roles: MemberRole[], memberRoles: MemberRole[]) => roles.length === 0 || roles.some((role) => memberRoles.includes(role))
