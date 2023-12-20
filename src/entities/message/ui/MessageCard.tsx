import classNames from 'classnames'
import { Member } from 'entities/member'
import { Message } from 'entities/message'
import { Icon } from 'shared/ui'

type Props = {
  message: Message
  currentMember?: Member
}

export const MessageCard = (props: Props) => {
  const { currentMember, message } = props
  const { id, createdAt, updatedAt, fromMemberId, toMemberId, message: text, isRead } = message

  const isCurrentMember = fromMemberId === currentMember?.id

  return (
    <div key={id} className={classNames('chat__item', { 'chat__item--right': isCurrentMember })}>
      <div className={classNames('chat__item-text', { 'chat__item-text--read': isRead })}>
        {text}
        {isCurrentMember && <Icon type='read-message' />}
      </div>
      <div className='chat__item-date'>{updatedAt}</div>
    </div>
  )
}
