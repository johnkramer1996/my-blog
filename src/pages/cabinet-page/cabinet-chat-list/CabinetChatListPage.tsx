import { MemberCard, MembersList, memberApi, useMembersForMessageQuery } from 'entities/member'
import { PATH_PAGE } from 'shared/lib'
import { Button, SectionTitle } from 'shared/ui'

export const CabinetChatListPage = () => {
  const { data: members = [] } = useMembersForMessageQuery()

  return (
    <section className='s-chat'>
      <SectionTitle className='mb-30' left>
        Chats
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
      {/* {members.map((member) => {
        return (
          <Author
            key={member.id}
            to={PATH_PAGE.cabinet.messages.member(member.login)}
            image={member.avatar}
            name={member.login}
            status={member.status}
            className='mb-20'
          ></Author>
        )
      })} */}
    </section>
  )
}
