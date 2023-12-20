import { PATH_PAGE } from 'shared/lib'
import { Button, SectionTitle } from 'shared/ui'

export function NotFoundPage() {
  return (
    <section className='section s-404'>
      <div className='container'>
        <div className='container text-center'>
          <SectionTitle className='mb-30'>Page not found</SectionTitle>
          <p>Sorry, we couldn’t find the page you’re looking for.</p>
          <div className='mt-50'>
            <Button to={PATH_PAGE.root}>Go back home</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
