import { useAppDispatch, useConfirmPopup } from 'shared/model'
import { logoutThunk } from '../model/logout.thunk'

export const useOnConfirmLogout = () => {
  const dispatch = useAppDispatch()
  const logoutPopup = useConfirmPopup()

  const onConfirmLogout = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()

    logoutPopup.show({
      title: 'Are you sure?',
      onConfirm: async () => {
        try {
          await dispatch(logoutThunk()).unwrap()
        } finally {
          logoutPopup.remove()
        }
      },
      onCancel: () => logoutPopup.remove(),
    })
  }

  return onConfirmLogout
}
