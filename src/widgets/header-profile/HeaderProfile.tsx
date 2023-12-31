import { Icon } from 'shared/ui'
import { PATH_CABINET_MENU, PATH_PAGE } from 'shared/lib'
import { useAppSelector, useEvent } from 'shared/model'
import { userApi } from 'entities/user/api/user.api'
import { useOnConfirmLogout } from 'features/session/logout/lib/use-on-confirm-logout'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import classNames from 'classnames'
import { hasPermissionByMember, memberApi } from 'entities/member'
import './HeaderProfile.scss'

type Props = {
  className?: string
}

export const HeaderProfile = (props: Props) => {
  const { data: currentUser, isSuccess } = useAppSelector(userApi.endpoints.currentUser.select())
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const onConfirmLogout = useOnConfirmLogout()
  const [open, setOpen] = useState(false)

  useEvent((event: Event) => {
    if ((event.target as HTMLElement).closest('.header-profile')) return
    setOpen(false)
  })

  if (!isSuccess) return <div>profileData error</div>

  const closeDropdown = () => setOpen(false)
  const toggleDropdown = () => setOpen((p) => !p)

  const items = PATH_CABINET_MENU.filter((el) => hasPermissionByMember(el.roles, currentMember))

  return (
    <div className={classNames('header-profile', props.className)}>
      <div className='header-profile__image image image--cover image--author' onClick={toggleDropdown}>
        {currentUser.avatar && <img src={currentUser.avatar} alt='' />}
      </div>
      <ul className={classNames('header-profile__dropdown', { 'header-profile__dropdown--open': open })}>
        {items.map((el, i) => {
          return (
            <li key={i} className='header-profile__dropdown-item'>
              <Link to={el.to} onClick={closeDropdown} className='header-profile__dropdown-link'>
                {el.name}
              </Link>
            </li>
          )
        })}
        <li className='header-profile__dropdown-item'>
          <button onClick={onConfirmLogout} className='header-profile__dropdown-link header-profile__dropdown-link--logout'>
            Logout
            <Icon type='arrow-long-right' color='red' size='xs' right />
          </button>
        </li>
      </ul>
    </div>
  )
}
