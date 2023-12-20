import { Member } from '../model/member.model'
import { MemberRole } from '../../../shared/model/member-role'

export const hasPermisison = (member: Member | undefined, roles: MemberRole[]) => member && roles.some((role) => member.roles.includes(role))
