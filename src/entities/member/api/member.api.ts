import { baseApi, MEMBER_TAG, invalidateAccessToken, CURRENT_MEMBER_TAG } from 'shared/api'
import { memberMapper } from '../mapper/member.mapper'
import { memberRoutes } from './member.routes'
import { Member } from '../model/member.model'
import { MemberRole } from '../../../shared/model/member-role'
import { MemberDto } from '../dto/member.dto'
import { Paginated } from 'shared/model'

export const memberApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    members: builder.query<Paginated<Member>, void>({
      query: () => ({ url: memberRoutes.FIND_MEMBERS }),
      transformResponse: (response: Paginated<MemberDto>) => ({ ...response, data: response.data.map(memberMapper) }),
      keepUnusedDataFor: 0,
    }),
    memberByLogin: builder.query<Member, { login: string }>({
      query: ({ login }) => ({ url: memberRoutes.FIND_MEMBER_BY_LOGIN(login) }),
      transformResponse: memberMapper,
      providesTags: [MEMBER_TAG],
      keepUnusedDataFor: 5,
    }),
    currentMember: builder.query<Member, void>({
      query: () => ({ url: memberRoutes.FIND_CURRENT_MEMBER, credentials: 'include' }),
      providesTags: [CURRENT_MEMBER_TAG],
      transformResponse: memberMapper,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled
        } catch (error) {
          dispatch(invalidateAccessToken())
        }
      },
    }),
    membersForMessage: builder.query<Member[], void>({
      query: () => ({ url: memberRoutes.FIND_MEMBERS_FOR_MESSAGE }),
      transformResponse: (response: MemberDto[]) => response.map(memberMapper),
      keepUnusedDataFor: 0,
    }),
    updateLastActive: builder.query<void, void>({
      query: () => ({ url: memberRoutes.UPDATE_MEMBER_LAST_ACTIVE, method: 'POST' }),
    }),
    attachOrDetachRole: builder.mutation<void, { login: string; action: 'attach' | 'detach'; role: MemberRole }>({
      query: ({ login, action, ...body }) => ({ url: memberRoutes.ADD_ROLE_TO_MEMBER(login, action), method: 'POST', body }),
      invalidatesTags: [CURRENT_MEMBER_TAG, MEMBER_TAG],
    }),
    banMember: builder.mutation<void, { login: string }>({
      query: ({ login }) => ({ url: memberRoutes.BAN_MEMBER(login), method: 'POST' }),
      invalidatesTags: [MEMBER_TAG],
    }),
    recoverMember: builder.mutation<void, { login: string }>({
      query: ({ login }) => ({ url: memberRoutes.RECOVER_MEMBER(login), method: 'POST' }),
      invalidatesTags: [MEMBER_TAG],
    }),
  }),
})

export const {
  useMembersQuery,
  useMemberByLoginQuery,
  useCurrentMemberQuery,
  useMembersForMessageQuery,
  useUpdateLastActiveQuery,
  useAttachOrDetachRoleMutation,
  useBanMemberMutation,
  useRecoverMemberMutation,
} = memberApi
