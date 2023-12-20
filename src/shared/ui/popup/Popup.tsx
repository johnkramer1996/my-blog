import { useModal } from '@ebay/nice-modal-react'
import classNames from 'classnames'
import { PropsWithChildren, useEffect } from 'react'
import './Popup.scss'

export type PopupType = 'callback' | 'offer' | 'thanks' | 'player' | 'policy'

export type PopupSize = 'md' | 'full'

export type PopupProps = PropsWithChildren<{
  type?: PopupType
  size?: PopupSize
}>

export const Popup = (props: PopupProps) => {
  const { visible, remove } = useModal()
  const { children, type = 'callback', size = 'md' } = props

  useEffect(() => {
    document.addEventListener('keydown', onEscapeKeyClick)

    return () => {
      document.removeEventListener('keydown', onEscapeKeyClick)
    }
  }, [])

  const onEscapeKeyClick = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      remove()
    }
  }

  return (
    <>
      <div className={classNames('popup', { 'popup--active': visible })}>
        <div className='popup__overlay' onClick={remove}></div>
        <div className='popup__wrapper'>
          <div className='popup__inner'>
            <div
              className={classNames(['popup__content', `popup__content--${type}`, `popup__content--${size}`], {
                'popup__content--p-0': type === 'player',
                'popup__content--active': visible,
              })}
            >
              {children}
              <button className='popup__close' onClick={remove}></button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
