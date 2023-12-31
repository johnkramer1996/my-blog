import { Member } from 'entities/member'
import { MessageCard, useFindMessagesByLoginQuery } from 'entities/message'

type Props = {
  page: number
  limit: number
  login: string
  currentMember?: Member
}
export const MessagesShowMore = (props: Props) => {
  const { page, limit, login, currentMember } = props
  const { data: { data: messages = [] } = {}, isLoading } = useFindMessagesByLoginQuery({ page, limit, login }, { skip: !login })

  return (
    <>
      {isLoading ? (
        <div>is loading</div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} currentMember={currentMember} />
          ))}
        </>
      )}
    </>
  )
}
