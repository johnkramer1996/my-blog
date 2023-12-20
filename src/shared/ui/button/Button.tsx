import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { onScrollToBlock } from 'shared/lib'

type ButtonHTML = ButtonHTMLAttributes<HTMLButtonElement>
type AnchorHTML = AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonColor = 'primary' | 'secondary' | 'dangerous' | 'success'
type ButtonSize = 'xs' | 'sm' | 'md'

export type ButtonProps = {
  children?: ReactNode
  color?: ButtonColor
  size?: ButtonSize
  border?: boolean
  maxWidth?: boolean
  backgroundDark?: boolean
  withoutColor?: boolean
  link?: boolean
  loading?: boolean
  disabled?: boolean
  className?: string
} & (({ to: string } & AnchorHTML) | ButtonHTML)

export const Button = (props: ButtonProps) => {
  const { children, color = 'primary', size = 'md', border, maxWidth, link, backgroundDark, withoutColor, loading, disabled, className, ...rest } = props

  const fullClassName = classNames(
    `btn btn--${color} btn--${size}`,
    {
      'btn--max': maxWidth,
      'btn--dark-background': backgroundDark,
      'btn--without-color': withoutColor,
      'btn--border': border,
      'btn--link': link,
      'btn--loading': loading,
      'btn--disabled': disabled || loading,
    },
    className
  )

  return (
    <>
      {'to' in rest ? (
        rest.to[0] === '#' ? (
          <a href={rest.to} className={fullClassName} {...rest} onClick={(e) => onScrollToBlock(e, rest.to)}>
            {children}
          </a>
        ) : (
          <Link {...rest} to={rest.to} className={fullClassName}>
            {children}
          </Link>
        )
      ) : (
        <button className={fullClassName} {...rest} disabled={disabled || loading}>
          {children}
          {loading && (
            <span className='btn__loader'>
              <i></i>
              <i></i>
              <i></i>
            </span>
          )}
        </button>
      )}
    </>
  )
}
