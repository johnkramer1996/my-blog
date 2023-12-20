import { Logo } from '../logo/Logo'
import './Footer.scss'

export const Footer = () => {
  return (
    <footer className='footer item-bg'>
      <div className='item-bg__bg'></div>
      <div className='container'>
        <Logo className='footer__logo' />
      </div>
    </footer>
  )
}
