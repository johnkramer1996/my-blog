import classNames from 'classnames'
import { VoteButton, VoteSize } from '../vote-button/VoteButton'
import './VoteButtonGroup.scss'

type Props = {
  wasUpvotedByMe: boolean
  wasDownvotedByMe: boolean
  points: number
  up: () => void
  down: () => void
  size?: VoteSize
  className?: string
}

export const VoteButtonGroup = (props: Props) => {
  const { wasUpvotedByMe, wasDownvotedByMe, points, up, down, size } = props

  return (
    <div className={classNames('vote-group', size && `vote-group--${size}`, props.className)}>
      <VoteButton onClick={up} state='up' size={props.size} active={wasUpvotedByMe} className='vote-group__button' />
      <div className='vote-group__points'>{points}</div>
      <VoteButton onClick={down} state='down' size={props.size} active={wasDownvotedByMe} className='vote-group__button' />
    </div>
  )
}
