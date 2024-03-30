import { memberApi } from 'entities/member'
import { userApi } from 'entities/user'
import { Link } from 'react-router-dom'
import { PATH_PAGE, errorHandler } from 'shared/lib'
import { useAppSelector } from 'shared/model'
import { Icon, SectionTitle } from 'shared/ui'
import { Dashboard } from 'widgets'

export const CabinetDashboard = () => {
  const currentMember = useAppSelector(memberApi.endpoints.currentMember.select())
  const currentUser = useAppSelector(userApi.endpoints.currentUser.select())

  if (!currentMember.isSuccess) return errorHandler(currentMember.error)
  if (!currentUser.isSuccess) return errorHandler(currentUser.error)

  const { data: member } = currentMember
  const { data: user } = currentUser

  return (
    <>
      <section className='s-dashboard' id='dashboard'>
        <SectionTitle left className='mb-30'>
          Dashboard
        </SectionTitle>
        <Dashboard image={member.avatar} className='mb-10'>
          <h3 className='h3 dashboard__title'>
            Hello, <span className='text-primary'>{user.firstName}!</span>
          </h3>
        </Dashboard>{' '}
        <Link to={PATH_PAGE.members.member.root(member.login)} className='text-link text-underline'>
          Public profile
          <Icon type='arrow-long-right' right />
        </Link>
      </section>
    </>
  )
}
