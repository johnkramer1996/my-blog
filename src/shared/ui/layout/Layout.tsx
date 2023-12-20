import { type ReactNode } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

type Props = {
  headerSlot?: ReactNode
  footerSlot?: ReactNode
}

export function Layout(props: Props) {
  return (
    <>
      {props.headerSlot}
      <Outlet />
      {props.footerSlot}

      <ScrollRestoration />
    </>
  )
}
