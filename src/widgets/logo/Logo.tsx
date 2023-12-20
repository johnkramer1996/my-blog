import classNames from 'classnames'
import { ReactComponent as LogoImage } from './img/logo.svg'
import { Link } from 'react-router-dom'
import './Logo.scss'

type Props = {
  className?: string
}
export const Logo = (props: Props) => {
  return (
    <Link to={'/'} className={classNames('logo', props.className)}>
      <LogoImage className='logo__image' />
      <div className='logo__text'>
        my-blog<span>.ua</span>
      </div>
    </Link>
  )
}
