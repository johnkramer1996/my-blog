import { Link } from 'react-router-dom'
import { ReactNode } from 'react'
import './Dashboard.scss'
import classNames from 'classnames'

type Props = {
  image: string | null
  children: ReactNode
  className?: string
}
export const Dashboard = (props: Props) => {
  const { image, children, className } = props
  return (
    <div className={classNames('item-bg dashboard', className)}>
      <div className='item-bg__bg'></div>
      <div className='dashboard__image image--author image image--cover image--circle'>{image && <img src={image} alt='' />}</div>
      <div className='dashboard__text'>{children}</div>
    </div>
  )
}
