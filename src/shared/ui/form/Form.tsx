import { zodResolver } from '@hookform/resolvers/zod'
import { notifyUnknown } from 'shared/lib'
import { ReactNode, useEffect } from 'react'
import { DefaultValues, FieldValues, SubmitHandler, useForm, FormProvider } from 'react-hook-form'
import { ZodSchema } from 'zod'
import classNames from 'classnames'

type Props<TFormValues extends FieldValues> = {
  onSubmit?: (data: TFormValues) => Promise<void>
  validationSchema?: ZodSchema<any>
  defaultValues?: DefaultValues<TFormValues>
  children: ReactNode
  notResetAfterSubmit?: boolean
  className?: string
}

export const Form = <TFormValues extends FieldValues>(props: Props<TFormValues>) => {
  const { onSubmit, defaultValues, validationSchema, children, notResetAfterSubmit = false, className } = props

  const methods = useForm<TFormValues>({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    criteriaMode: 'all',
    defaultValues,
  })
  const {
    reset,
    formState: { isSubmitSuccessful, errors },
  } = methods

  const onSubmitHandle: SubmitHandler<TFormValues> = async (data) => {
    try {
      onSubmit && (await onSubmit(data))
    } catch (e) {
      notifyUnknown(e)
      methods.setError('root.serverError', { message: 'server error' })
    }
  }

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  useEffect(() => {
    !notResetAfterSubmit && isSubmitSuccessful && !errors.root?.serverError && reset()
  }, [notResetAfterSubmit, isSubmitSuccessful, reset, errors])

  return (
    <form onSubmit={methods.handleSubmit(onSubmitHandle)} className={classNames('form', className)}>
      <FormProvider {...methods}>{children}</FormProvider>
    </form>
  )
}
