import { MouseEvent } from 'react'

export const scrollToBlock = (id: string) => {
  const target = document.querySelector(id)
  if (!target) return
  const targetTop = target.getBoundingClientRect().top
  const headerHeight = 0
  window.scrollBy({ top: targetTop - headerHeight, behavior: 'smooth' })
}

export const onScrollToBlock = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
  e.preventDefault()
  scrollToBlock(id)
}
