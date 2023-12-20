import { useCurrentMemberQuery, useUpdateLastActiveQuery } from 'entities/member'
import { selectIsAuth } from 'entities/session'
import { useCurrentUserQuery } from 'entities/user'
import { useAppSelector } from 'shared/model'
import { Layout, Preloader } from 'shared/ui'
import { Footer, Header } from 'widgets'

export const BaseLayout = () => {
  const isAuth = useAppSelector(selectIsAuth)
  useUpdateLastActiveQuery(undefined, { skip: !isAuth, pollingInterval: 1000 * 60 * 10 /* 10 min */ })
  const currentUserState = useCurrentUserQuery(undefined, { skip: !isAuth })
  const currentMemberState = useCurrentMemberQuery(undefined, { skip: !isAuth })

  if (currentUserState.isLoading || currentMemberState.isLoading) return <Preloader />

  return <Layout headerSlot={<Header />} footerSlot={<Footer />} />
}
