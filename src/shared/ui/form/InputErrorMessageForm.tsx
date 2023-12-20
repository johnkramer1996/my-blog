import { FC } from 'react'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { InputErrorMessage } from 'shared/ui'

interface Props {
  name: string
  errors: FieldErrors<FieldValues>
}

export const InputErrorMessageForm = ({ errors, name }: Props) => {
  return (
    <ErrorMessage
      errors={errors}
      name={name}
      render={({ messages, message }) => <InputErrorMessage>{messages ? Object.values(messages).join(', ') : message} </InputErrorMessage>}
    />
  )
}
