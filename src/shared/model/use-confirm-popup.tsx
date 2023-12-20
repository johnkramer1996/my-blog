import NiceModal, { useModal, create } from '@ebay/nice-modal-react'
import { Button, Popup } from 'shared/ui'

type Props = {
  title: string
  confirmText?: string
  onConfirm: () => void
  onCancel?: () => void
  cancelText?: string
}

export function ConfirmPopupPresenter(props: Props) {
  const { remove } = useModal()
  const { title, onConfirm, onCancel = () => remove(), confirmText = 'Yes', cancelText = 'No' } = props

  return (
    <Popup>
      {<div className='form__heading form__heading--title h3 popup__title text-bold' dangerouslySetInnerHTML={{ __html: title }}></div>}
      <div className='btn-group'>
        <Button onClick={onConfirm}>{confirmText}</Button>
        <Button color='secondary' onClick={onCancel}>
          {cancelText}
        </Button>
      </div>
    </Popup>
  )
}

export const ConfirmPopup = create(ConfirmPopupPresenter)

export const useConfirmPopup = () => {
  return useModal(ConfirmPopup)
}
