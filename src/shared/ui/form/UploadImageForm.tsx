import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { get } from 'lodash'
import { useFileInputWithPreview } from 'shared/model'
import { UploadImage } from '../upload-image/UploadImage'
import { InputErrorMessageForm } from './InputErrorMessageForm'

type Props<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  circle?: boolean
  label?: string
  defaultSrc?: string
  onChange?: (name: string, value: File) => void
  onDelete?: (name: string) => void
}

export const UploadImageForm = <TFormValues extends Record<string, unknown>>(props: Props<TFormValues>) => {
  const { name, label, defaultSrc, circle } = props
  const {
    formState: { errors },
  } = useFormContext()
  const inputProps = useFileInputWithPreview(props)

  const errorMessages = get(errors, name)
  const hasError = !!(errors && errorMessages)

  return (
    <>
      <UploadImage
        {...inputProps}
        defaultSrc={defaultSrc}
        circle={circle}
        label={label}
        hasError={hasError}
        errorSlot={
          <>
            <InputErrorMessageForm errors={errors} name={name} />
            <InputErrorMessageForm errors={errors} name={name + 'Preview'} />
          </>
        }
      />
    </>
  )
}
