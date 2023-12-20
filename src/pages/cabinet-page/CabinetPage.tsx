import { hasPermisison, memberApi } from 'entities/member'
import { Outlet } from 'react-router-dom'
import { PATH_CABINET_MENU } from 'shared/lib/paths'
import { useAppSelector } from 'shared/model'
import { Sidebar } from 'widgets/sidebar/Sidebar'

export const CabinetPage = () => {
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())
  const items = PATH_CABINET_MENU.filter((el) => hasPermisison(currentMember, el.roles))

  return (
    <>
      <main className='container section'>
        <div className='row ai-flex-start'>
          <Sidebar className='col-lg-3 col-12' items={items}></Sidebar>

          <div className='col-lg-9 col-12'>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  )
}
