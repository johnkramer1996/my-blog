import { userApi } from 'entities/user'
import { Link } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { errorHandler, useAppSelector } from 'shared/model'
import { Icon, Preloader, SectionTitle } from 'shared/ui'
import { Dashboard } from 'widgets'

export const CabinetDashboard = () => {
  const currentUser = useAppSelector(userApi.endpoints.currentUser.select())

  if (!currentUser.isSuccess) return errorHandler(currentUser.error)

  const { data: user } = currentUser

  return (
    <>
      <section className='s-dashboard' id='dashboard'>
        <SectionTitle left className='mb-30'>
          Dashboard
        </SectionTitle>
        <Dashboard image={user.avatar} className='mb-10'>
          <h3 className='h3 dashboard__title'>
            Hello, <span className='text-primary'>{user.firstName}!</span>
          </h3>
        </Dashboard>{' '}
        <Link to={PATH_PAGE.profile.user.root(user.login)} className='text-link text-underline'>
          Public profile
          <Icon type='arrow-long-right' right />
        </Link>
      </section>
    </>
  )
}
