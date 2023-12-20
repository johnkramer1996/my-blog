import { InputHTMLAttributes, ReactNode, forwardRef } from 'react'

type Props = {
  value?: string | number
  label: string
  type?: 'radio' | 'checkbox'
} & InputHTMLAttributes<HTMLInputElement>

export const RadioInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { label, type = 'radio', ...rest } = props

  const allProps = {
    ...rest,
    type: type,
  }

  return (
    <label className='input-radio'>
      <input className='input-radio__input' ref={ref} {...allProps} />
      <i className='input-radio__check'></i>
      <span className='input-radio__label'>{label}</span>
    </label>
  )
})
