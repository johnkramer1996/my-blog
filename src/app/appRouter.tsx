import { Navigate, createBrowserRouter } from 'react-router-dom'
import {
  CabinetDashboard,
  CabinetPage,
  CabinetSettings,
  CreatePostPage,
  ErrorPage,
  MainPage,
  MemberPage,
  MemberPostsPage,
  NotFoundPage,
  PostPage,
  SignInPage,
  UpdatePostPage,
  CabinetChatListPage,
  CabinetChatPage,
  CabinetPosts,
} from 'pages'
import { BaseLayout } from './layouts/baseLayout'
import { PATH_PAGE } from 'shared/lib'
import { GuestGuard } from './guard/GuestGuard'
import { AuthGuard } from './guard/AuthGuard'
import { MemberProfilePage } from 'pages/member-page'
import { MemberRole, useAppSelector } from 'shared/model'
import { ReactElement } from 'react'
import { hasPermisison, memberApi } from 'entities/member'
import { PATH_PAGE_PERMISSION } from 'shared/lib/paths'

export type Props = {
  permission: MemberRole[]
  children: ReactElement
}

export const PermissionGuard = ({ permission, children }: Props): ReactElement => {
  const { data: currentMember } = useAppSelector(memberApi.endpoints.currentMember.select())

  if (permission.length && !hasPermisison(currentMember, permission)) return <Navigate to={PATH_PAGE.root} replace />

  return children
}

export const appRouter = () => {
  return createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <div>error</div>,
      children: [
        {
          path: PATH_PAGE.signIn,
          element: (
            <AuthGuard>
              <SignInPage />
            </AuthGuard>
          ),
        },
        {
          path: PATH_PAGE.signUp,
          element: (
            <AuthGuard>
              <SignInPage />
            </AuthGuard>
          ),
        },
        {
          path: PATH_PAGE.root,
          element: <MainPage />,
        },
        {
          path: PATH_PAGE.posts.root,
          element: <MainPage />,
        },
        {
          path: PATH_PAGE.posts.slug(':slug'),
          element: <PostPage />,
        },
        {
          path: PATH_PAGE.profile.user.root(':login'),
          element: <MemberPage />,
          children: [
            {
              path: PATH_PAGE.profile.user.root(':login'),
              element: <MemberProfilePage />,
            },
            {
              path: PATH_PAGE.profile.user.posts(':login'),
              element: <MemberPostsPage />,
            },
          ],
        },
        {
          path: PATH_PAGE.cabinet.root,
          element: (
            <GuestGuard>
              <CabinetPage />
            </GuestGuard>
          ),
          children: [
            {
              path: PATH_PAGE.cabinet.root,
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.root}>
                  <CabinetDashboard />
                </PermissionGuard>
              ),
            },
            {
              path: PATH_PAGE.cabinet.posts.root,
              element: <CabinetPosts />,
            },
            {
              path: PATH_PAGE.cabinet.settings,
              element: <CabinetSettings />,
            },
            {
              path: PATH_PAGE.cabinet.messages.root,
              element: <CabinetChatListPage />,
            },
            {
              path: PATH_PAGE.cabinet.messages.member(':login'),
              element: <CabinetChatPage />,
            },
          ],
        },
        {
          path: PATH_PAGE.cabinet.posts.createPost,
          element: (
            <GuestGuard>
              <CreatePostPage />
            </GuestGuard>
          ),
        },
        {
          path: PATH_PAGE.cabinet.posts.updatePost(':slug'),
          element: (
            <GuestGuard>
              <UpdatePostPage />
            </GuestGuard>
          ),
        },
        { path: PATH_PAGE[404], element: <NotFoundPage /> },
        { path: PATH_PAGE.error, element: <ErrorPage /> },
        { path: '*', element: <Navigate to={PATH_PAGE[404]} replace /> },
      ],
    },
  ])
}
