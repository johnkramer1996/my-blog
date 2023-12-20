import { Link, useNavigate } from 'react-router-dom'
import { PATH_PAGE } from 'shared/lib'
import { Button } from 'shared/ui'

export const ErrorPage = () => {
  const navigate = useNavigate()
  const back = () => navigate(-1)

  return (
    <section className='section s-error'>
      <div className='container'>
        <div className='container text-center'>
          <h1 className='h1 section-title'>Error page</h1>
          <div className='mt-50'>
            <Button onClick={back}>Go back back</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
