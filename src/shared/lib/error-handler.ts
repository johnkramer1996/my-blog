import React from 'react'
import { Navigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { isFetchBaseQueryError } from 'shared/api'

export const errorHandler = (error: unknown) => {
  const notFound = isFetchBaseQueryError(error) && error?.status === 404
  return React.createElement(Navigate, { to: notFound ? PATH_PAGE[404] : PATH_PAGE.error, replace: true })
}
