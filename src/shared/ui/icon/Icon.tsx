import classNames from 'classnames'
import { ArrowLongRightIcon, ArrowRightIcon, CommentIcon, DateIcon, EyeIcon, PencilEditIcon, ReadMessageIcon, TrashIcon, UserIcon } from './svg'
import './Icon.scss'

export type IconType = 'arrow-long-right' | 'arrow-right' | 'comment' | 'date' | 'eye' | 'pencil-edit' | 'read-message' | 'trash' | 'user'

export type IconColor = 'primary' | 'black' | 'white' | 'red' | 'gray'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg'

const icons: Record<IconType, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
  'arrow-long-right': ArrowLongRightIcon,
  'arrow-right': ArrowRightIcon,
  comment: CommentIcon,
  date: DateIcon,
  eye: EyeIcon,
  'pencil-edit': PencilEditIcon,
  'read-message': ReadMessageIcon,
  trash: TrashIcon,
  user: UserIcon,
}

type IconProps = {
  type: IconType
  size?: IconSize
  color?: IconColor
  left?: boolean
  right?: boolean
  className?: string
}

export const Icon = (props: IconProps) => {
  const { type, size = 'lg', color, left, right, className } = props
  const Icon = icons[type]

  return <Icon className={classNames(`icon icon--${size}`, { [`icon--${color}`]: Boolean(color), 'icon--left': left, 'icon--right': right }, className)}></Icon>
}
