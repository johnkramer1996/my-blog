import { MemberRoleEntity } from '../model/member-role-entity'
import { Member } from 'entities/member'

export const getMemberRole = (currentMember: Member | undefined, member: Member): MemberRoleEntity => {
  if (!currentMember) return 'guest'
  if (currentMember && currentMember.login === member.login) return 'owner'
  return 'member'
}
