import { Outlet, useParams } from 'react-router-dom'
import { Preloader } from 'shared/ui'
import { useMemberByLoginQuery } from 'entities/member'
import { errorHandler } from 'shared/lib'
import { Sidebar } from 'widgets'
import { PATH_PAGE } from 'shared/lib'

export const MemberPage = () => {
  const { login } = useParams() as { login: string }
  const { data: member, isLoading, isSuccess, error } = useMemberByLoginQuery({ login })

  if (isLoading) return <Preloader />

  if (!isSuccess) return errorHandler(error)

  return (
    <main className='section'>
      <div className='container'>
        <div className='row ai-flex-start'>
          <Sidebar
            className='col-lg-3 col-12'
            items={[
              { to: PATH_PAGE.members.member.root(member.login), name: 'Profile' },
              { to: PATH_PAGE.members.member.posts(member.login), name: 'Posts' },
            ]}
          ></Sidebar>
          <div className='col-lg-9 col-12'>
            <Outlet />
          </div>
        </div>
      </div>
    </main>
  )
}
