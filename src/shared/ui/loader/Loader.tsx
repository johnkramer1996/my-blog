import React from 'react'
import LoaderStyle from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={LoaderStyle['sk-cube-grid']}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
