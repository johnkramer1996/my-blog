import { Member, MemberCard } from 'entities/member'
import { ReactNode } from 'react'

type Props = {
  members: Member[]
  renderMember?: (member: Member) => ReactNode
}
export const MembersList = (props: Props) => {
  const { members, renderMember } = props

  return (
    <>
      <div className='items row'>
        {renderMember
          ? members.map(renderMember)
          : members.map((member) => <MemberCard key={member.id} member={member} className='col-lg-3 col-md-6 col-12 items__item' />)}
      </div>
    </>
  )
}
