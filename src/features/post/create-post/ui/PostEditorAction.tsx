import { Button, Icon } from 'shared/ui'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type Props = {
  slug?: string
}

export const PostEditorAction = (props: Props) => {
  const { slug } = props

  const methods = useFormContext()
  const navigate = useNavigate()

  const { isDirty } = methods.formState

  const onReset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    methods.reset()
  }

  const onBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <>
      {slug ? (
        <>
          <Button color='secondary' className='mt-10' maxWidth>
            Save
          </Button>
        </>
      ) : (
        <Button color='secondary' maxWidth>
          Save
        </Button>
      )}
      {isDirty ? (
        <Button onClick={onReset} className='mt-10' border maxWidth>
          Reset
        </Button>
      ) : (
        <Button onClick={onBack} className='mt-10' border maxWidth>
          Back
        </Button>
      )}
    </>
  )
}
