import { useState } from 'react'

type TypePage = 'first' | 'prev' | 'next' | 'last' | 'page' | 'start-ellipsis' | 'end-ellipsis'

const buttonPage = (type: TypePage, page: number, lastPage: number): number => {
  switch (type) {
    case 'first':
      return 1
    case 'prev':
      return page - 1
    case 'next':
      return page + 1
    default:
      return lastPage
  }
}
type Params = {
  boundaryCount?: number
  limit?: number
  count?: number
  lastPage?: number
  defaultPage?: number
  page?: number
  selectedPages?: number[]
  disabled?: boolean
  hideNextButton?: boolean
  hidePrevButton?: boolean
  showFirstButton?: boolean
  showLastButton?: boolean
  siblingCount?: number
  onChange?: (page: number) => void
}

export type PaginationItem = {
  type: TypePage
  clickPage: number
  selected: boolean
  disabled: boolean
  onClick: () => void
}

export const usePagination = (props: Params) => {
  const {
    boundaryCount = 1,
    count: countItems = 10,
    limit = 10,
    disabled: defaultDisabled = false,
    defaultPage = 1,
    lastPage = Math.ceil(countItems / limit),
    page: pageProp,
    selectedPages: activePagesProp = [],
    hideNextButton = false,
    hidePrevButton = false,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
    onChange: handleChange,
  } = props

  // const lastPage = Math.ceil(countItems / limit)
  const [page, setPageState] = useState(pageProp ?? defaultPage)
  const currentPage = pageProp ?? page
  const activePages = activePagesProp.length ? activePagesProp : [currentPage]

  const handleClick = (value: number) => {
    if (!pageProp) setPageState(value)
    if (handleChange) handleChange(value)
  }

  const range = (start: number, end: number) => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
  }
  const startPages = range(1, Math.min(boundaryCount, lastPage))
  const endPages = range(Math.max(lastPage - boundaryCount + 1, boundaryCount + 1), lastPage)

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      lastPage - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : lastPage - 1
  )

  const pageNumbers: (number | TypePage)[] = [
    ...(showFirstButton ? ['first' as TypePage] : []),
    ...(hidePrevButton ? [] : ['prev' as TypePage]),
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2 ? ['start-ellipsis' as TypePage] : boundaryCount + 1 < lastPage - boundaryCount ? [boundaryCount + 1] : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < lastPage - boundaryCount - 1 ? ['end-ellipsis' as TypePage] : lastPage - boundaryCount > boundaryCount ? [lastPage - boundaryCount] : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next' as TypePage]),
    ...(showLastButton ? ['last' as TypePage] : []),
  ]

  const items: PaginationItem[] = pageNumbers.map((el) => {
    const isNumber = typeof el === 'number'
    const type = isNumber ? 'page' : el
    const clickPage = isNumber ? el : buttonPage(el, currentPage, lastPage)
    const selected = isNumber && activePages.includes(el)
    const onClick = () => handleClick(clickPage)
    const disabled =
      !defaultDisabled && (isNumber ? selected : el.indexOf('ellipsis') === -1 && (el === 'next' || el === 'last') ? currentPage >= lastPage : currentPage <= 1)

    return { type, clickPage, selected, onClick, disabled }
  })

  return { items }
}
