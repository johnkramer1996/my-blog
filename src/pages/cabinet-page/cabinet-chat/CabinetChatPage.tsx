import { memberApi, useMemberByLoginQuery } from 'entities/member'
import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'shared/model'
import { Author, SectionTitle } from 'shared/ui'
import { PATH_PAGE, errorHandler } from 'shared/lib'
import { MessageCard, useFindMessagesByLoginQuery } from 'entities/message'
import { useChat } from '../../../features/message/chat/model/useChat'
import { useEffect } from 'react'
import { CreateMessageForm } from 'features/message/create-message'
import { readMessagesThunk } from 'features/message/read-messages'
import { MessagesShowMore } from './MessagesShowMore'
import { LIMIT } from 'shared/const'
import './Chat.scss'

const limit = LIMIT.messages.cabinet

export const CabinetChatPage = () => {
  const { login } = useParams() as { login: string }
  const dispatch = useAppDispatch()
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const { data: member, isSuccess: isSuccessMember, ...memberState } = useMemberByLoginQuery({ login })
  const {
    data: { data: messages = [] } = {},
    isSuccess: isSuccessMessage,
    ...messagesState
  } = useFindMessagesByLoginQuery({ page: 1, limit, login }, { skip: !login })

  const fromMember = currentMember?.id ?? ''
  const toMember = member?.id ?? ''

  const { isUserTyping, page, onSubmit, onChange, onEmit, chatRef } = useChat({ toMember, fromMember, messages })

  useEffect(() => {
    if (!(toMember && fromMember)) return

    dispatch(readMessagesThunk({ messages, currentMemberId: fromMember }))
      .unwrap()
      .then(() => {
        onEmit('readAll')
      })
  }, [toMember, fromMember, messages, dispatch, onEmit])

  if (memberState.isLoading || messagesState.isLoading) return <div>Loading</div>
  if (!isSuccessMember) return errorHandler(memberState.error)
  if (!isSuccessMessage) return errorHandler(messagesState.error)
  if (fromMember === toMember) return <Navigate to={PATH_PAGE.cabinet.messages.root} replace />

  return (
    <section className='s-chat'>
      <SectionTitle className='mb-30' left>
        Chat
      </SectionTitle>

      <div className='chat'>
        <div className='chat__user'>
          <Author to={PATH_PAGE.members.member.root(member.login)} image={member.avatar} name={member.login} status={member.status} />
        </div>

        <div className='chat__items' ref={chatRef}>
          {isUserTyping && (
            <div className='chat__item'>
              <div className='chat__item-text'>Typing...</div>
            </div>
          )}
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} currentMember={currentMember} />
          ))}
          {Array(page)
            .fill(null)
            .map((_, i) => i + 2)
            .map((page) => (
              <MessagesShowMore key={page} limit={limit} page={page} login={login} currentMember={currentMember} />
            ))}
        </div>
        <CreateMessageForm toMemberId={toMember} onComplete={onSubmit} onChange={onChange} />
      </div>
    </section>
  )
}
