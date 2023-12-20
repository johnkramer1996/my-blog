import { useEffect } from 'react'

export const useEvent = (listener: EventListener, event: keyof HTMLElementEventMap = 'click', element: HTMLElement = document.body) => {
  useEffect(() => {
    element.addEventListener(event, listener)
    return () => element.removeEventListener(event, listener)
  }, [element, event, listener])
}
