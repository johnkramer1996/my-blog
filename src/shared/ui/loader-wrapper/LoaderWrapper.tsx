import { ReactNode } from 'react'
import { Loader } from '../loader/Loader'

type Props = {
  isLoading: boolean
  children: ReactNode
  loader?: ReactNode
}

export const LoaderWrapper = (props: Props) => {
  const { children, isLoading, loader = <Loader /> } = props
  return <>{isLoading ? loader : children}</>
}
