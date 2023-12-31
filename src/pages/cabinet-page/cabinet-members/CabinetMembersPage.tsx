import { Button, SectionTitle } from 'shared/ui'
import { useMembersQuery } from 'entities/member/api/member.api'
import { MembersList } from '../../../entities/member/ui/member-list/MembersList'
import { MemberCard } from 'entities/member'
import { PATH_PAGE } from 'shared/lib'

export const CabinetMembersPage = () => {
  const { data: { data: members = [] } = {} } = useMembersQuery()

  return (
    <section className='s-members'>
      <SectionTitle className='mb-30' left>
        Members
      </SectionTitle>
      <MembersList
        members={members}
        renderMember={(member) => (
          <MemberCard
            key={member.id}
            member={member}
            actionsSlot={
              <>
                <Button to={PATH_PAGE.cabinet.messages.member(member.login)} className='mt-10' maxWidth>
                  Write message
                </Button>
              </>
            }
            className='col-lg-3 col-md-6 col-12 items__item'
          />
        )}
      />
    </section>
  )
}
