import { Button, ButtonProps, Icon } from 'shared/ui'
import { ButtonHTMLAttributes, ReactNode } from 'react'
import { useDeletePopup } from '../lib/use-delete-popup'

type Props = {
  slug: string
  onComplete?: () => void
} & ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export const DeletePostButton = (props: Props & { children: ReactNode }) => {
  const { slug, onComplete, ...rest } = props
  const onDelete = useDeletePopup({ slug }, onComplete)

  return (
    <Button onClick={onDelete} {...rest}>
      {props.children}
    </Button>
  )
}
