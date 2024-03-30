import { useCurrentUserQuery } from 'entities/user'
import { Preloader } from 'shared/ui'
import { SectionTitle } from 'shared/ui'
import { UserSettingsForm } from 'features/user'
import { errorHandler } from 'shared/lib'

export const CabinetSettings = () => {
  const currentUser = useCurrentUserQuery()

  if (currentUser.isLoading) return <Preloader />
  if (!currentUser.isSuccess) return errorHandler(currentUser.error)

  const { data: user } = currentUser

  return (
    <>
      <section className='s-settings'>
        <SectionTitle className='mb-30' left>
          Settings
        </SectionTitle>
        <UserSettingsForm user={user} />
      </section>
    </>
  )
}
