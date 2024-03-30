import React from 'react'
import { ReactComponent as PreloaderSvg } from './img/preloader.svg'
import './Preloader.scss'

export const Preloader = () => {
  return (
    <div className='preloader'>
      <PreloaderSvg />
    </div>
  )
}
