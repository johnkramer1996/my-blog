import { ButtonProps, Icon } from 'shared/ui'
import { ButtonHTMLAttributes } from 'react'
import { useDeletePopup } from '../lib/use-delete-popup'
import { IconSize } from 'shared/ui/icon/Icon'

type Props = {
  slug: string
  onComplete?: () => void
  iconSize?: IconSize
} & ButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export const DeletePostIcon = (props: Props) => {
  const { slug, onComplete, iconSize: size, ...rest } = props
  const onDelete = useDeletePopup({ slug }, onComplete)

  return (
    <button onClick={onDelete} {...rest}>
      <Icon type='trash' color='red' size={size} />
    </button>
  )
}
