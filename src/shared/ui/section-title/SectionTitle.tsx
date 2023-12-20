import { ComponentProps, ReactNode } from 'react'
import classNames from 'classnames'
import './SectionTitle.scss'

type Props = {
  children?: ReactNode
  subtitle?: string
  className?: string
  white?: boolean
  left?: boolean
} & ComponentProps<'h2'>

export const SectionTitle = (props: Props) => {
  const { children, subtitle, className, white, left, ...rest } = props
  return (
    <>
      {children && (
        <h2 className={classNames('h2 section-title', { 'section-title--left': left, 'text-white': white }, className)} {...rest}>
          {children}
        </h2>
      )}
      {subtitle && <h3 className={classNames('h3 section-subtitle', { 'section-subtitle--left': left, 'text-white': white })}>{subtitle}</h3>}
    </>
  )
}
