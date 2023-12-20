import get from 'lodash.get'
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { Input, InputPropsUI } from 'shared/ui'
import { InputErrorMessageForm } from './InputErrorMessageForm'

type InputHTML = Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' | 'onChange'>
type TextareaHTML = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onBlur' | 'onChange'>

export type InputFormProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  onChange?: (name: Path<TFormValues>, value: string) => void
  onBlur?: (name: Path<TFormValues>, value: string) => void
} & Omit<InputPropsUI, 'hasError' | 'errorSlot'> &
  (({ type: string } & InputHTML) | TextareaHTML)

export const InputForm = <TFormValues extends Record<string, unknown>>(props: InputFormProps<TFormValues>) => {
  const { name, onChange, onBlur, ...rest } = props
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<TFormValues>()

  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  const onChangeHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    onChange && onChange(name, e.target.value)
  }
  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    onBlur && onBlur(name, e.target.value)
  }

  return (
    <div className='form__input'>
      <Input
        {...rest}
        {...(register && register(name, { onChange: onChangeHandler, onBlur: onBlurHandler }))}
        filled={Boolean(getValues(name))}
        autoComplete='off'
        hasError={hasError && !rest.disabled}
        errorSlot={
          <InputErrorMessageForm
            errors={errors}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            name={name as any}
          />
        }
      />
    </div>
  )
}
