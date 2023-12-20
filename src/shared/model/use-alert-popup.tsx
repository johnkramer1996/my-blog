import { useModal, create as createModal } from '@ebay/nice-modal-react'
import { Button, Popup } from 'shared/ui'

type Props = {
  title: string
  onButtonClick?: () => void
  buttonText?: string
}

function AlertPopupPresenter(props: Props) {
  const { remove } = useModal()
  const { title, onButtonClick = () => remove(), buttonText = 'Okay' } = props

  return (
    <Popup>
      {<div className='form__heading form__heading--title h3 popup__title text-bold' dangerouslySetInnerHTML={{ __html: title }}></div>}
      <Button onClick={onButtonClick}>{buttonText}</Button>
    </Popup>
  )
}

export const AlertPopup = createModal(AlertPopupPresenter)

export const useAlertPopup = () => {
  return useModal(AlertPopup)
}
