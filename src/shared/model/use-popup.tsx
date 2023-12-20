import { create, useModal } from '@ebay/nice-modal-react'
import { Popup } from 'shared/ui'
import { ReactNode } from 'react'

type Props = {
  contentSlot: ReactNode
}

const PopupPresenter = (props: Props) => {
  const { contentSlot } = props

  return (
    <Popup type='callback' size='md'>
      {contentSlot}
    </Popup>
  )
}

const CallbackPopup = create(PopupPresenter)

export const usePopup = () => {
  return useModal(CallbackPopup)
}
