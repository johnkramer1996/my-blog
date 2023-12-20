import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { InputErrorMessageForm } from './InputErrorMessageForm'
import { RadioInput } from '../radio-input/RadioInput'
import get from 'lodash.get'
import { InputHTMLAttributes } from 'react'

type Props<TFormValues extends FieldValues, Value> = {
  name: Path<TFormValues>
  onChange?: (name: Path<TFormValues>, value: Value, checked: boolean) => void
  onBlur?: (name: Path<TFormValues>, value: Value, checked: boolean) => void
  label: string
  options: {
    value: Value
    label: string
  }[]
  type?: 'radio' | 'checkbox'
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'>

export const RadioGroupForm = <TFormValues extends Record<string, unknown>, Value extends string | number = string | number>(
  props: Props<TFormValues, Value>
) => {
  const { label, name, options, type, value, onChange, onBlur, ...rest } = props
  const {
    register,
    formState: { errors },
  } = useFormContext()

  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  const onChangeHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange && onChange(name, e.target.value as Value, e.target.checked)
  }
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(name, e.target.value as Value, e.target.checked)
  }

  return (
    <div className='input input--radio'>
      <div className='input-label'>{label}</div>
      {options.map((el, i) => (
        <RadioInput
          key={i}
          value={el.value}
          label={el.label}
          type={type}
          {...(register && register(name, { onChange: onChangeHandler, onBlur: onBlurHandler }))}
          {...rest}
        />
      ))}
      <InputErrorMessageForm errors={errors} name={name} />
    </div>
  )
}
