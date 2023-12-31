import { MEMBER_ROLES, MemberRole } from 'shared/model'
import { config } from './config'

export const PATH_PAGE = {
  root: '/',
  signUp: '/sign-up',
  signIn: '/sign-in',
  posts: {
    root: '/',
    slug: (slug: string) => `/posts/${slug}`,
  },
  members: {
    root: `/members`,
    member: {
      root: (login: string) => `/members/${login}`,
      posts: (login: string) => `/members/${login}/posts`,
    },
  },
  cabinet: {
    root: '/cabinet',
    settings: '/cabinet/settings',
    posts: {
      root: `/cabinet/posts`,
      createPost: `/cabinet/posts/create`,
      updatePost: (slug: string) => `/cabinet/posts/${slug}/update`,
    },
    members: {
      root: `/cabinet/members`,
      member: (login: string) => `/cabinet/members/${login}`,
    },
    messages: {
      root: `/cabinet/messages`,
      member: (login: string) => `/cabinet/messages/${login}`,
    },
  },
  404: '/404',
  error: '/error',
}

export const PATH_PAGE_PERMISSION = {
  cabinet: {
    root: [MEMBER_ROLES.admin],
    settings: [MEMBER_ROLES.admin],
    posts: {
      root: [MEMBER_ROLES.admin, MEMBER_ROLES.editor, MEMBER_ROLES.author, MEMBER_ROLES.contributor],
      createPost: [MEMBER_ROLES.admin, MEMBER_ROLES.editor, MEMBER_ROLES.author, MEMBER_ROLES.contributor],
      updatePost: [MEMBER_ROLES.admin, MEMBER_ROLES.editor, MEMBER_ROLES.author, MEMBER_ROLES.contributor],
    },
    members: {
      root: [MEMBER_ROLES.admin],
      member: [MEMBER_ROLES.admin],
    },
    messages: {
      root: [MEMBER_ROLES.editor],
      member: [],
    },
  },
}

export const PATH_IMAGE = (image: string) => `${config.SITE_ENDPOINT}/${image}`

export const PATH_CABINET_MENU: { to: string; name: string; roles: MemberRole[] }[] = [
  { to: PATH_PAGE.cabinet.root, name: 'Dashboard', roles: PATH_PAGE_PERMISSION.cabinet.root },
  { to: PATH_PAGE.cabinet.posts.root, name: 'Posts', roles: PATH_PAGE_PERMISSION.cabinet.posts.root },
  { to: PATH_PAGE.cabinet.members.root, name: 'Members', roles: PATH_PAGE_PERMISSION.cabinet.members.root },
  { to: PATH_PAGE.cabinet.settings, name: 'Settings', roles: PATH_PAGE_PERMISSION.cabinet.settings },
  { to: PATH_PAGE.cabinet.messages.root, name: 'Messages', roles: PATH_PAGE_PERMISSION.cabinet.messages.root },
]
