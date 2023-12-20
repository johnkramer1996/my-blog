import React from 'react'
import { Navigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { isFetchBaseQueryError } from 'shared/api'

export const errorHandler = (error: any) => {
  console.log({ error })
  if (isFetchBaseQueryError(error) && error?.status === 404) return React.createElement(Navigate, { to: PATH_PAGE[404], replace: true })
  return React.createElement(Navigate, { to: PATH_PAGE.error, replace: true })
}
