import { Button } from 'shared/ui'
import { useOnConfirmLogout } from '../../lib/use-on-confirm-logout'

export function LogoutButton() {
  const onConfirmLogout = useOnConfirmLogout()

  return (
    <Button color='secondary' size='sm' onClick={onConfirmLogout}>
      logout
    </Button>
  )
}
