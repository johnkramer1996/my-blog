import React, { useMemo, useState, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'

export const usePaginationQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const startPage = useMemo(() => Number(searchParams.get('page') ?? 1), [searchParams])
  const [page, setPage] = useState(startPage)

  const onChangePage = useCallback(
    (page: number) => {
      setSearchParams(
        /**
         * 👇 ATTENTION: _params return stale data https://github.com/remix-run/react-router/issues/9757
         */
        (_params) => {
          const params = new URLSearchParams(window.location.search)
          page === 1 ? params.delete('page') : params.set('page', String(page))
          return params
        },
        { preventScrollReset: true }
      )
      setPage(page)
    },
    [setSearchParams]
  )

  React.useEffect(() => {
    searchParams.size === 0 && page !== 1 && onChangePage(1)
  }, [searchParams, page, onChangePage])

  return [page, onChangePage] as const
}
