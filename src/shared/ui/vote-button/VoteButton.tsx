import React from 'react'
import { FaArrowCircleDown, FaArrowCircleUp, FaRegArrowAltCircleDown, FaRegArrowAltCircleUp } from 'react-icons/fa'
import classNames from 'classnames'
import './VoteButton.scss'

export type VoteSize = 'sm' | 'md'

export type VoteButtonProps = {
  state: 'up' | 'down'
  size?: VoteSize
  active: boolean
  onClick: () => void
  className?: string
}

export const VoteButton = (props: VoteButtonProps) => {
  const { state, size = 'md', active, onClick, className } = props
  return (
    <button
      onClick={onClick}
      className={classNames(
        'vote-button',
        `vote-button--${size}`,
        {
          'vote-button--up': state === 'up',
          'vote-button--down': state === 'down',
          'vote-button--active': active,
        },
        className
      )}
    >
      {state === 'up' ? (
        active ? (
          <FaArrowCircleUp aria-label='downvote' />
        ) : (
          <FaRegArrowAltCircleUp aria-label='upvote' />
        )
      ) : active ? (
        <FaArrowCircleDown aria-label='downvote' />
      ) : (
        <FaRegArrowAltCircleDown aria-label='upvote' />
      )}
    </button>
  )
}
