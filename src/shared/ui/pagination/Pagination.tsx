import classNames from 'classnames'
import { usePagination } from 'shared/model'
import './Pagination.scss'
import { Icon } from '../icon/Icon'

export type PaginationProps = {
  page?: number
  count?: number
  limit?: number
  lastPage?: number
  selectedPages?: number[]
  onChangePage?: (page: number) => void
  className?: string
}

export const Pagination = ({ count, page, limit, lastPage, onChangePage, selectedPages, className }: PaginationProps) => {
  const { items: pageNumbers } = usePagination({
    count,
    defaultPage: page,
    page,
    lastPage,
    selectedPages,
    limit,
    onChange: onChangePage,
  })

  return (
    <div className={classNames('pagination', className)}>
      {pageNumbers.map(({ type, clickPage, selected, ...props }, i) => {
        return type === 'page' ? (
          <button
            key={i}
            {...props}
            className={classNames('pagination__page pagination__page--number', {
              'pagination__page--selected': selected,
            })}
          >
            {clickPage}
          </button>
        ) : type === 'first' || type === 'prev' || type === 'next' || type === 'last' ? (
          <button
            key={i}
            className={classNames(`pagination__page pagination__page--arrow pagination__page--arrow-${type}`, {
              'pagination__page--disabled': props.disabled,
            })}
            {...props}
          >
            <Icon type='arrow-right' />
          </button>
        ) : (
          <div className='pagination__page pagination__page--ellipsis' key={i}>
            ...
          </div>
        )
      })}
    </div>
  )
}
