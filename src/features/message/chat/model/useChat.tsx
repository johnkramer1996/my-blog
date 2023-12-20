import { useAppDispatch } from 'shared/model'
import { useCallback, useEffect, useRef, useState } from 'react'
import { config } from 'shared/lib'
import { Socket, io } from 'socket.io-client'
import { Message, messageApi } from 'entities/message'
import { MESSAGE_TAG } from 'shared/api'

type Params = {
  toMember: string
  fromMember: string
  messages: Message[]
}
export const useChat = (params: Params) => {
  const { toMember, fromMember, messages } = params

  const dispatch = useAppDispatch()
  const chatRef = useRef<HTMLDivElement | null>(null)
  const socketRef = useRef<Socket>()
  const [isUserTyping, setUserTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (!(toMember && fromMember)) return

    socketRef.current = io(config.SITE_ENDPOINT)
    if (!socketRef.current) return
    socketRef.current.emit('online', { fromMember, toMember })

    socketRef.current.on('online', (params) => {
      if (!(params.fromMember === toMember)) return
      setIsOnline(true)
      dispatch(messageApi.util.invalidateTags([MESSAGE_TAG]))
    })
    socketRef.current.on('offline', (params) => {
      if (!(params.fromMember === toMember)) return
      setIsOnline(false)
    })
    socketRef.current.on('readAll', (params) => {
      if (!(params.fromMember === toMember)) return
      dispatch(messageApi.util.invalidateTags([MESSAGE_TAG]))
    })
    socketRef.current.on('startTyping', (params) => {
      if (!(params.fromMember === toMember)) return
      setUserTyping(true)
    })
    socketRef.current.on('endTyping', (params) => {
      if (!(params.fromMember === toMember)) return
      setUserTyping(false)
    })
    socketRef.current.on('addMessage', async (params) => {
      if (!(params.fromMember === toMember)) return
      dispatch(messageApi.util.invalidateTags([MESSAGE_TAG]))
    })
    socketRef.current.on('updateMessage', async (params) => {
      if (!(params.fromMember === toMember)) return
      dispatch(messageApi.util.invalidateTags([MESSAGE_TAG]))
    })
    return () => {
      socketRef.current?.emit('offline', { fromMember, toMember })
      socketRef.current?.disconnect()
    }
  }, [toMember, fromMember, dispatch])

  useEffect(() => {
    if (!chatRef.current) return

    chatRef.current.addEventListener('scroll', (e: Event) => {
      const target = e.target as HTMLElement
      if (!target) return
      const { scrollHeight, scrollTop, clientHeight } = target
      if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
        setPage((p) => p + 1)
      }
    })
  }, [chatRef, messages.length])

  // useEffect(() => {
  //   if (!chatRef.current) return

  //   chatRef.current.scrollTo(0, chatRef.current.scrollHeight)
  // }, [messages])

  const onEmit = useCallback((event: 'readAll') => socketRef.current?.emit(event, { fromMember, toMember }), [fromMember, toMember])

  const onSubmit = () => {
    setPage(1)

    socketRef.current?.emit('addMessage', { fromMember, toMember })
    socketRef.current?.emit('endTyping', { fromMember, toMember })
    chatRef.current?.scrollTo(0, 0)
    // chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }

  const onChange = (_: string, value: string) => {
    const hasValue = !(value === '')
    socketRef.current?.emit(hasValue ? 'startTyping' : 'endTyping', { fromMember, toMember })
  }

  return { isUserTyping, isOnline, page, onSubmit, onChange, onEmit, chatRef }
}
