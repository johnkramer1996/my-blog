import dayjs from 'dayjs'
import { useSettingsMutation } from 'entities/user/api/user.api'
import { User } from 'entities/user'
import { zodResolver } from '@hookform/resolvers/zod'
import { notifySuccess, notifyUnknown, objectToFormData } from 'shared/lib'
import { InputForm, RadioInput } from 'shared/ui'
import { UploadImageForm } from 'shared/ui'
import { useForm, FormProvider, useWatch } from 'react-hook-form'
import { UserSettingsFormSchema, userSettingsFormSchema } from '../model/user-settings-form.schema'

type Props = {
  user: User
}

export const UserSettingsForm = (props: Props) => {
  const { user } = props

  const [settings] = useSettingsMutation()

  const form = useForm({
    criteriaMode: 'all',
    defaultValues: {
      avatarPreview: user.avatar,
      email: user.email,
      password: '',
      passwordConfirm: '',
      createdAt: user.createdAt,
      firstName: user.firstName,
      lastName: user.lastName,
      changeEmail: false,
      changePassword: false,
    },
    resolver: zodResolver(userSettingsFormSchema),
  })
  const watchEmail = useWatch({ control: form.control, name: 'changeEmail' })
  const watchPassword = useWatch({ control: form.control, name: 'changePassword' })

  const onBlur = async (key: string, value: string | File = 'delete') => {
    if (key in user && value === user[key as keyof typeof user]) return
    if (!(await form.trigger(key as keyof typeof form.formState.defaultValues))) return

    const entries = { [key]: value }
    if (key === 'password') {
      if (!form.formState.touchedFields['passwordConfirm'] || !(await form.trigger('passwordConfirm'))) return
      entries['passwordConfirm'] = value
    } else if (key === 'passwordConfirm') {
      if (form.formState.errors['password']) return
      entries['password'] = value
    }
    if (key === 'email') {
      form.setValue('changeEmail', false)
    }
    if (key === 'password' || key === 'passwordConfirm') {
      form.setValue('changePassword', false)
    }

    try {
      const formData = objectToFormData(entries)
      await settings(formData).unwrap()
      notifySuccess('Ви успішно змінили поле')
    } catch (e) {
      notifyUnknown(e)
    }
  }

  return (
    <>
      <div className='item-bg'>
        <div className='item-bg__bg'></div>
        <h3 className='h3 text-bold mb-20 text-primary'>Account</h3>
        <FormProvider {...form}>
          <UploadImageForm<UserSettingsFormSchema> onChange={onBlur} onDelete={onBlur} label='Photo' name='avatar' circle />
          <InputForm<UserSettingsFormSchema>
            onBlur={onBlur}
            type='email'
            name='email'
            label='Email'
            actionsSlot={
              <RadioInput
                label='change'
                {...form.register('changeEmail', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    form.setValue('email', user.email)
                  },
                })}
              />
            }
            disabled={!watchEmail}
          />

          <InputForm<UserSettingsFormSchema>
            onBlur={onBlur}
            type='password'
            name='password'
            label='Password'
            actionsSlot={
              <RadioInput
                label='change'
                {...form.register('changePassword', {
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    form.resetField('password')
                    form.resetField('passwordConfirm')
                  },
                })}
              />
            }
            disabled={!watchPassword}
          />
          {watchPassword && <InputForm<UserSettingsFormSchema> onBlur={onBlur} type='password' name='passwordConfirm' label='Confirm Password' />}
          <InputForm<User> onBlur={onBlur} type='text' name='createdAt' label='Дата регистрации' disabled />
        </FormProvider>
      </div>
      <div className='item-bg mt-30'>
        <div className='item-bg__bg'></div>
        <h3 className='h3 text-bold mb-20 text-primary'>Personal information</h3>
        <FormProvider {...form}>
          <InputForm<UserSettingsFormSchema> onBlur={onBlur} type='text' name='firstName' label='First name' />
          <InputForm<UserSettingsFormSchema> onBlur={onBlur} type='text' name='lastName' label='Last name' />
        </FormProvider>
      </div>
    </>
  )
}
