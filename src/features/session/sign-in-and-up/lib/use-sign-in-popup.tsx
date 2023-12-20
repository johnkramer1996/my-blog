import { usePopup } from 'shared/model'
import { SignInAndUpTabs } from '../ui/SignInAndUpTabs'

export const useSignInPopup = () => {
  const popup = usePopup()

  return {
    ...popup,
    show: (complete?: () => void) =>
      popup.show({
        contentSlot: (
          <SignInAndUpTabs
            onComplete={() => {
              complete && complete()
              popup.remove()
            }}
          />
        ),
      }),
  }
}
