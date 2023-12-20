import classNames from 'classnames'
import { NavLink } from 'react-router-dom'
import { ReactNode } from 'react'
import './Sidebar.scss'

type Props = {
  className?: string
} & ({ items: { to: string; name: string }[] } | { children?: ReactNode })

export const Sidebar = (props: Props) => {
  const hasItems = 'items' in props
  return (
    <aside className={classNames('sidebar item-bg item-bg--grid', { 'item-bg--p-0': hasItems }, props.className)}>
      <div className='item-bg__bg'></div>
      {hasItems ? (
        <>
          <ul>
            {props.items.map((el, i) => (
              <li key={i} className='sidebar__item'>
                <NavLink to={el.to} className={({ isActive, isPending }) => 'sidebar__link ' + (isPending ? '' : isActive ? 'sidebar__link--active' : '')} end>
                  {el.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </>
      ) : (
        props.children
      )}
    </aside>
  )
}
