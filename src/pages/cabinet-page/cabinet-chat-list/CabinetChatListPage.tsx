import { memberApi, useMembersForMessageQuery } from 'entities/member'
import { Author, SectionTitle } from 'shared/ui'
import { PATH_PAGE } from 'shared/lib'

export const CabinetChatListPage = () => {
  const { data: members = [] } = useMembersForMessageQuery()

  return (
    <section className='s-chat'>
      <SectionTitle className='mb-30' left>
        Chats
      </SectionTitle>
      {members.map((member) => {
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
      })}
    </section>
  )
}
