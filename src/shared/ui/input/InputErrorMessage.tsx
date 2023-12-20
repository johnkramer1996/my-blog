import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

type InputErrorProps = {
  className?: string
  children: ReactNode
}

export const InputErrorMessage: FC<InputErrorProps> = ({ children, className }) => {
  return (
    <div className={classNames('input-error', className)} role='alert'>
      {children}
    </div>
  )
}
