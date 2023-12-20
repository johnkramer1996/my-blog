import classNames from 'classnames'
import { Member } from 'entities/member/model/member.model'
import React, { ReactNode } from 'react'
import './MemberCard.scss'

type Props = {
  member: Member
  actionsSlot?: ReactNode
  className?: string
}

export const MemberCard = (props: Props) => {
  const { member, actionsSlot, className } = props

  return (
    <div className={classNames('member-card', className)}>
      <div className='member-card__image image image--circle image--cover image--author image--author-lg ml-auto mr-auto'>
        {member.avatar && <img src={member.avatar} alt='' />}
      </div>
      <div className='member-card__name'>{member.login}</div>
      <ul className='member-card__list'>
        <li className='member-card__list-item'>
          <div className='member-card__list-label'>Roles</div>
          <div className='member-card__list-value'> {member.roles.join(', ')}</div>
        </li>
        <li className='member-card__list-item'>
          <div className='member-card__list-label'>Is ban</div>
          <div className='member-card__list-value'> {member.isBanned ? 'yes' : 'no'}</div>
        </li>
        <li className='member-card__list-item'>
          <div className='member-card__list-label'>Status</div>
          <div className='member-card__list-value'> {member.status}</div>
        </li>
        <li className='member-card__list-item'>
          <div className='member-card__list-label'>Login</div>
          <div className='member-card__list-value'> {member.login}</div>
        </li>
        <li className='member-card__list-item'>
          <div className='member-card__list-label'>Email</div>
          <div className='member-card__list-value'> {member.email}</div>
        </li>
        <li className='member-card__list-item'>
          <div className='member-card__list-label'>Retutation</div>
          <div className='member-card__list-value'> {member.reputation}</div>
        </li>
      </ul>
      {actionsSlot}
    </div>
  )
}
