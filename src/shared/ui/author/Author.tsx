import { Link } from 'react-router-dom'
import './Author.scss'
import classNames from 'classnames'

type Props = {
  to: string
  image: string | null
  name: string
  status?: 'online' | 'offline'
  size?: 'sm' | 'md'
  className?: string
}
export const Author = (props: Props) => {
  const { to, image, name, status, size = 'md', className } = props

  return (
    <Link to={to} className={classNames('text-author', className)}>
      <div className={classNames('text-author__image image image--cover image-circle image--author', `image--author-${size}`)}>
        {image && <img src={image} alt='' />}
        <div
          className={classNames('text-author__status', {
            'text-author__status--online': status === 'online',
            'text-author__status--offline': status === 'offline',
          })}
        ></div>
      </div>
      <div className='text-author__text'>
        <div className='text-author__name'>{name}</div>
      </div>
    </Link>
  )
}
