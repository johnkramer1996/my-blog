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
  CabinetMembersPage,
  CabinetMemberPage,
} from 'pages'
import { BaseLayout } from './layouts/baseLayout'
import { PATH_PAGE } from 'shared/lib'
import { GuestGuard } from './guard/GuestGuard'
import { AuthGuard } from './guard/AuthGuard'
import { PermissionGuard } from './guard/PermissionGuard'
import { MemberProfilePage } from 'pages/member-page'
import { PATH_PAGE_PERMISSION } from 'shared/lib/paths'

export const appRouter = () => {
  return createBrowserRouter([
    {
      element: <BaseLayout />,
      errorElement: <ErrorPage />,
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
          path: PATH_PAGE.members.member.root(':login'),
          element: <MemberPage />,
          children: [
            {
              path: PATH_PAGE.members.member.root(':login'),
              element: <MemberProfilePage />,
            },
            {
              path: PATH_PAGE.members.member.posts(':login'),
              element: <MemberPostsPage />,
            },
          ],
        },
        {
          path: PATH_PAGE.cabinet.root,
          element: (
            <GuestGuard>
              <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.root}>
                <CabinetPage />
              </PermissionGuard>
            </GuestGuard>
          ),
          children: [
            {
              path: PATH_PAGE.cabinet.root,
              element: <CabinetDashboard />,
            },
            {
              path: PATH_PAGE.cabinet.posts.root,
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.posts.root}>
                  <CabinetPosts />
                </PermissionGuard>
              ),
            },
            {
              path: PATH_PAGE.cabinet.members.root,
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.members.root}>
                  <CabinetMembersPage />
                </PermissionGuard>
              ),
            },
            {
              path: PATH_PAGE.cabinet.members.member(':login'),
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.members.member}>
                  <CabinetMemberPage />
                </PermissionGuard>
              ),
            },
            {
              path: PATH_PAGE.cabinet.settings,
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.settings}>
                  <CabinetSettings />
                </PermissionGuard>
              ),
            },
            {
              path: PATH_PAGE.cabinet.messages.root,
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.messages.root}>
                  <CabinetChatListPage />
                </PermissionGuard>
              ),
            },
            {
              path: PATH_PAGE.cabinet.messages.member(':login'),
              element: (
                <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.messages.member}>
                  <CabinetChatPage />
                </PermissionGuard>
              ),
            },
          ],
        },
        {
          path: PATH_PAGE.cabinet.posts.createPost,
          element: (
            <GuestGuard>
              <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.posts.createPost}>
                <CreatePostPage />
              </PermissionGuard>
            </GuestGuard>
          ),
        },
        {
          path: PATH_PAGE.cabinet.posts.updatePost(':slug'),
          element: (
            <GuestGuard>
              <PermissionGuard permission={PATH_PAGE_PERMISSION.cabinet.posts.updatePost}>
                <UpdatePostPage />
              </PermissionGuard>
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
