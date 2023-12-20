import { COLORS } from 'shared/const'
import classNames from 'classnames'
import ContentLoader from 'react-content-loader'

type Props = {
  className?: string
}

export const PostCardLoader = (props: Props) => {
  return (
    <div className={classNames(props.className, 'post-card post-card--loader item-bg')}>
      <div className='item-bg__wrapper'></div>
      <ContentLoader
        speed={2}
        width='100%'
        height='296'
        viewBox='0 0 100 296'
        backgroundColor={COLORS.loaderBackground}
        foregroundColor={COLORS.loaderForeground}
        preserveAspectRatio='none'
      >
        <rect x='0' y='0' rx='0' ry='0' width='100%' height='300' />
      </ContentLoader>
    </div>
  )
}
