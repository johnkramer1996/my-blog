import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { InputErrorMessageForm } from './InputErrorMessageForm'
import get from 'lodash.get'
import classNames from 'classnames'
import { useFileInput } from 'shared/model'

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
}

export const FileInputForm = <TFormValues extends Record<string, unknown>>(props: Props<TFormValues>) => {
  const { name } = props
  const {
    formState: { errors },
  } = useFormContext()
  const inputProps = useFileInput(props)

  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <div className={classNames('input input--file input-file', { 'input--error': hasError })}>
      <label className='input-file__label input__wrapper'>
        <input type='file' {...inputProps.inputFileProps} accept='image/*' />
        <span className='input-file__text input__input'>
          <span className='input-file__name '>
            {inputProps.fileInfo ? inputProps.fileInfo.name : 'Upload your photo'}
          </span>
          <span className='input-file__button' onClick={inputProps.fileInfo ? inputProps.onDelete : inputProps.onOpen}>
            {inputProps.fileInfo ? 'Delete' : 'Upload'}
          </span>
        </span>
      </label>
      <InputErrorMessageForm errors={errors} name={name} />
    </div>
  )
}
