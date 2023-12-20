import { Button, Icon } from 'shared/ui'
import { Logo } from '../logo/Logo'
import { PATH_PAGE } from 'shared/lib'
import { useAppSelector } from 'shared/model'
import { selectIsAuth } from 'entities/session'
import { HeaderProfile } from 'widgets'
import './Header.scss'

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuth)

  return (
    <header className='header'>
      <div className='container header__line'>
        <Logo className='header__line-logo' />
        {isAuth ? (
          <HeaderProfile className='header-line__profile' />
        ) : (
          <>
            <Button to={PATH_PAGE.signIn} className='header__line-button' color='secondary' size='sm'>
              Sign in
              <Icon type='user' right />
            </Button>
          </>
        )}
      </div>
    </header>
  )
}
